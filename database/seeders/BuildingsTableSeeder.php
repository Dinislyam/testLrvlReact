<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BuildingsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('buildings')->insert([
            ['building_name' => 'Полтавская 19'],
            ['building_name' => 'Железнодорожная 13'],
        ]);
    }
}
