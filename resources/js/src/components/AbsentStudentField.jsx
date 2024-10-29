import React from 'react';
import { TextField, Button, Box, MenuItem, Typography } from '@mui/material';

const AbsentStudentField = ({ student, index, reasons, onChange, onRemove }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Студент {index + 1}:</Typography>
            <TextField
                fullWidth
                label="ФИО студента"
                value={student.fullName}
                onChange={(e) => onChange(index, 'fullName', e.target.value)}
                required
                sx={{ mr: 2 }}
            />
            <TextField
                select
                label="Причина отсутствия"
                value={student.reasonId}
                onChange={(e) => onChange(index, 'reasonId', e.target.value)}
                required
                sx={{ minWidth: 200, mr: 2 }} // Задаем минимальную ширину для лучшего отображения
            >
                {reasons.map((reason) => (
                    <MenuItem key={reason.id} value={reason.id}>
                        {reason.reason_name}
                    </MenuItem>
                ))}
                <MenuItem value="6">ИнПлан</MenuItem>
            </TextField>
            <Button variant="outlined" color="error" onClick={() => onRemove(index)}>
                Удалить
            </Button>
        </Box>
    );
};

export default AbsentStudentField;
