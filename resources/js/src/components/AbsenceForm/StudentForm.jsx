import React from 'react';
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Typography,
    Paper,
} from '@mui/material';
import { useStudentContext } from '../../context/StudentContext.jsx';

const StudentForm = ({ reasons }) => {
    const { students, addStudent, removeStudent, setStudents } = useStudentContext();

    const handleStudentChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;
        setStudents(updatedStudents);
    };

    const handleAddStudent = () => {
        addStudent();
        // Прокрутка к последнему добавленному студенту
        setTimeout(() => {
            const element = document.querySelector('.student-form');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 0);
    };

    return (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', width: '100%', maxHeight: '400px', overflowY: 'auto' }} className="student-form">
            <Typography variant="h6" gutterBottom align="center">
                Добавить студентов
            </Typography>
            {students.map((student, index) => (
                <Card variant="outlined" style={{ marginBottom: '16px' }} key={index}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="ФИО студента"
                                    value={student.fullName}
                                    onChange={(e) =>
                                        handleStudentChange(index, 'fullName', e.target.value)
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Причина отсутствия</InputLabel>
                                    <Select
                                        value={student.reasonId}
                                        onChange={(e) =>
                                            handleStudentChange(index, 'reasonId', e.target.value)
                                        }
                                    >
                                        {reasons.map((reason) => (
                                            <MenuItem key={reason.reason_id} value={reason.reason_id}>
                                                {reason.reason_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={() => removeStudent(index)}
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                >
                                    Удалить
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            <Button
                onClick={handleAddStudent}
                variant="contained"
                color="primary"
                style={{ marginTop: '16px', width: '100%' }}
            >
                Добавить студента
            </Button>
        </Paper>
    );
};

export default StudentForm;
