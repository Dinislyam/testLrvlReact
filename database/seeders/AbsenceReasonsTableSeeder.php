<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AbsenceReasonsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('absence_reasons')->truncate(); // Удалить все записи из таблицы absence_reasons

        DB::table('absence_reasons')->insert([
            ['reason_name' => 'Заявление',                  'is_respectful' => 1],
            ['reason_name' => 'Больничный',                 'is_respectful' => 1],
            ['reason_name' => 'Приказ о снятии с пар',      'is_respectful' => 1],
            ['reason_name' => 'Военкомат',                  'is_respectful' => 1],
            ['reason_name' => 'Неуважительная причина',     'is_respectful' => 0],
            ['reason_name' => 'Инплан',                     'is_respectful' => 1],
        ]);
    }
}
