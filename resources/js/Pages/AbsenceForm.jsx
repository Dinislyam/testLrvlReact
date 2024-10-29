import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Paper, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useFetchData from '../src/hooks/useFetchData.js';
import AbsentStudentField from '../src/components/AbsentStudentField.jsx';

const AbsenceForm = () => {
    const { data: groups, loading: loadingGroups, error: errorGroups } = useFetchData('https://lrvltst/api/groups');
    const { data: reasons, loading: loadingReasons, error: errorReasons } = useFetchData('https://lrvltst/api/absence-reasons');

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [groupId, setGroupId] = useState('');
    const [studentsCount, setStudentsCount] = useState('');
    const [inplanCount, setInplanCount] = useState(0);
    const [absentStudents, setAbsentStudents] = useState([{ fullName: '', reasonId: '' }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Состояние для управления модальным окном
    const [openDialog, setOpenDialog] = useState(false);
    const [submitData, setSubmitData] = useState(null); // Состояние для хранения данных для отправки

    const handleStudentChange = (index, field, value) => {
        const newAbsentStudents = [...absentStudents];
        const previousReasonId = newAbsentStudents[index].reasonId;

        if (field === 'reasonId') {
            if (value === '6') {
                setInplanCount(prevCount => prevCount + 1);
            } else if (previousReasonId === '6') {
                setInplanCount(prevCount => prevCount - 1);
            }
        }

        newAbsentStudents[index][field] = value;
        setAbsentStudents(newAbsentStudents);
    };

    const addStudentField = () => {
        setAbsentStudents(prev => [...prev, { fullName: '', reasonId: '' }]);
    };

    const removeStudentField = (index) => {
        const newAbsentStudents = absentStudents.filter((_, i) => i !== index);
        const removedStudentReasonId = absentStudents[index].reasonId;

        if (removedStudentReasonId === '6') {
            setInplanCount(prevCount => prevCount - 1);
        }

        setAbsentStudents(newAbsentStudents);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!date || !groupId || !studentsCount || absentStudents.some(student => !student.fullName || !student.reasonId)) {
            setSnackbarMessage('Пожалуйста, заполните все обязательные поля.');
            setOpenSnackbar(true);
            return;
        }

        const presentCount = Number(studentsCount) - absentStudents.length;

        const jsonData = {
            date,
            groupId,
            studentsCount: Number(studentsCount),
            inplanCount: Number(inplanCount),
            presentCount,
            absentStudents: absentStudents.map(student => ({
                fullName: student.fullName,
                reasonId: student.reasonId
            }))
        };

        // Устанавливаем данные для отправки в состояние и открываем диалог
        setSubmitData(jsonData);
        setOpenDialog(true);
    };

    const handleConfirmSubmit = () => {
        console.log(JSON.stringify(submitData, null, 2));
        // Здесь можно отправить данные на сервер, если это необходимо
        setOpenDialog(false); // Закрываем диалог после подтверждения
        // Сброс формы
        resetForm();
    };

    const resetForm = () => {
        setDate(new Date().toISOString().split('T')[0]);
        setGroupId('');
        setStudentsCount('');
        setInplanCount(0);
        setAbsentStudents([{ fullName: '', reasonId: '' }]);
    };

    if (loadingGroups || loadingReasons) return <p>Loading...</p>;
    if (errorGroups || errorReasons) return <p>Error fetching data!</p>;

    return (
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>Отметка отсутствия студентов</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    fullWidth
                    type="date"
                    label="Дата"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                />

                <TextField
                    select
                    fullWidth
                    label="Группа"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                >
                    {groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                            {group.group_name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="Количество студентов в группе"
                    type="number"
                    value={studentsCount}
                    onChange={(e) => setStudentsCount(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                />

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Отсутствующие студенты:</Typography>
                {absentStudents.map((student, index) => (
                    <AbsentStudentField
                        key={index}
                        student={student}
                        index={index}
                        reasons={reasons}
                        onChange={handleStudentChange}
                        onRemove={removeStudentField}
                    />
                ))}
                <Button variant="contained" onClick={addStudentField} sx={{ mb: 2 }}>
                    Добавить студента
                </Button>

                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Отправить
                </Button>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <MuiAlert onClose={() => setOpenSnackbar(false)} severity="warning">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            {/* Модальное окно с информацией для подтверждения */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Подтверждение отправки</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Вы уверены, что хотите отправить следующую информацию?</Typography>
                    <Typography variant="body1"><strong>Дата:</strong> {submitData?.date}</Typography>
                    <Typography variant="body1"><strong>Группа:</strong> {groups.find(group => group.id === submitData?.groupId)?.group_name}</Typography>
                    <Typography variant="body1"><strong>Количество студентов в группе:</strong> {submitData?.studentsCount}</Typography>
                    <Typography variant="body1"><strong>Количество студентов на инплане:</strong> {submitData?.inplanCount}</Typography>
                    <Typography variant="body1"><strong>Количество присутствующих:</strong> {submitData?.presentCount}</Typography>
                    <Typography variant="h6">Отсутствующие студенты:</Typography>
                    <ul>
                        {submitData?.absentStudents.map((student, index) => (
                            <li key={index}>
                                {student.fullName} - Причина отсутствия: {reasons.find(reason => reason.id === student.reasonId)?.reason_name}
                            </li>
                        ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={handleConfirmSubmit} color="primary">
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default AbsenceForm;
