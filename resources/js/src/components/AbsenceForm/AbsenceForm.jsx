import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import useFetchData from '../../hooks/useFetchData.js';
import { StudentProvider } from '../../context/StudentContext.jsx';
import StudentForm from './StudentForm.jsx';
import DialogPreview from '../DialogPreview.jsx';

const AbsenceForm = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [studentCount, setStudentCount] = useState(0);
    const [studentsOnPlan, setStudentsOnPlan] = useState(0);
    const [studentsPresent, setStudentsPresent] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState(null); // Изменено с '' на null
    const [openDialog, setOpenDialog] = useState(false);
    const { data: groups, error: groupsError } = useFetchData('/api/groups');
    const { data: reasons, error: reasonsError } = useFetchData('/api/absence-reasons');

    if (groupsError) {
        return <div>Error loading groups: {groupsError.message}</div>;
    }

    if (reasonsError) {
        return <div>Error loading absence reasons: {reasonsError.message}</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenDialog(true);
    };

    return (
        <StudentProvider>
            <Container>
                <h1>Форма отсутствий</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                label="Дата"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Группа</InputLabel>
                                <Select
                                    value={selectedGroup || ''} // Проверка на null
                                        onChange={(e) => {
                                            console.log('Выбранная группа:', e.target.value);
                                            setSelectedGroup(e.target.value);
                                    }}
                                >
                                    {groups.length > 0 ? (
                                        groups.map((group) => (
                                            <MenuItem key={group.id} value={group.id}>
                                                {group.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No groups available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Количество студентов в группе"
                                type="number"
                                value={studentCount}
                                onChange={(e) => setStudentCount(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Количество студентов на инплане"
                                type="number"
                                value={studentsOnPlan}
                                onChange={(e) => setStudentsOnPlan(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Количество присутствующих"
                                type="number"
                                value={studentsPresent}
                                onChange={(e) => setStudentsPresent(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <StudentForm reasons={reasons} />
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="success">
                                Отправить
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <DialogPreview open={openDialog} onClose={() => setOpenDialog(false)} formData={{ date, selectedGroup, studentCount, studentsOnPlan, studentsPresent }} />
            </Container>
        </StudentProvider>
    );
};

export default AbsenceForm;
