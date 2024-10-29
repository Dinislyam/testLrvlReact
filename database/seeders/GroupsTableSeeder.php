<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupsTableSeeder extends Seeder
{
    public function run()
    {


        DB::table('groups')->insert([
            ['group_name' => 'ИС-112/24', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИСк-114/24', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ТО-115/24', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МЭ-117/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МР-15/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МР-16/24', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'СВ-11/24', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИС-212/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИС-214/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ТО-215/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МЭ-217/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МЭ-219/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МР-25/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'СВ-21/23', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИС-312/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИС-314/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ТО-315/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МЭ-317/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МЭ-319/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МР-35/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'СВ-31/22', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИС-412/21', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ИС-414/21', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ТО-413/21', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ТО-415/21', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'МЭ-417/21', 'is_professional' => 0, 'building_id' => 1],
            ['group_name' => 'ОЗ-1/23', 'is_professional' => 1, 'building_id' => 1],
            ['group_name' => 'ШТ-2/23', 'is_professional' => 1, 'building_id' => 1],
            ['group_name' => 'ШТ-3/23', 'is_professional' => 1, 'building_id' => 1],
            ['group_name' => 'ШТ-4/24', 'is_professional' => 1, 'building_id' => 1],
            ['group_name' => 'ОЗ-6/24', 'is_professional' => 1, 'building_id' => 1],
            ['group_name' => 'ШТ-5/24', 'is_professional' => 1, 'building_id' => 1],
        ]);
    }
}
