import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudentContext = () => {
    return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([{ fullName: '', reasonId: '' }]);

    const addStudent = () => {
        setStudents([...students, { fullName: '', reasonId: '' }]);
    };

    const removeStudent = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
    };

    return (
        <StudentContext.Provider value={{ students, setStudents, addStudent, removeStudent }}>
            {children}
        </StudentContext.Provider>
    );
};
