<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absence;
use App\Models\Student;
use App\Models\AbsenceReason;

class GroupAttendanceController extends Controller
{
    public function store(Request $request)
    {
        // Валидация входных данных
        $validatedData = $request->validate([
            'date' => 'required|date',
            'groupId' => 'required|exists:groups,id',
            'studentsCount' => 'required|integer',
            'inplanCount' => 'required|integer',
            'presentCount' => 'required|integer',
            'absentStudents' => 'required|array',
            'absentStudents.*.fullName' => 'required|string',
            'absentStudents.*.reasonId' => 'required|exists:absence_reasons,id',
        ]);

        // Сохранение записи о посещаемости
        $absence = Absence::create([
            'group_id' => $validatedData['groupId'],
            'students_in_group' => $validatedData['studentsCount'],
            'students_on_inplan' => $validatedData['inplanCount'],
            'students_fact' => $validatedData['presentCount'],
            'date_reported' => $validatedData['date'],
        ]);

        // Сохранение информации о студентах
        foreach ($validatedData['absentStudents'] as $absentStudent) {
            $student = Student::where('full_name', $absentStudent['fullName'])->first();

            // Если студент найден, обновляем его информацию о посещаемости
            if ($student) {
                $student->absence_id = $absence->id;
                $student->reason_id = $absentStudent['reasonId'];
                $student->save();
            } else {
                // Если студент не найден, можно добавить его в базу данных
                $student = Student::create([
                    'full_name' => $absentStudent['fullName'],
                    'group_id' => $validatedData['groupId'],
                    'absence_id' => $absence->id,
                    'reason_id' => $absentStudent['reasonId'],
                ]);
            }
        }

        // Возврат успешного ответа
        return response()->json(['message' => 'Attendance recorded successfully!'], 201);
    }
}
