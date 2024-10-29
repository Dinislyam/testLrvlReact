<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->collate('utf8mb4_unicode_ci'); // Вариант varchar(255)
            $table->longText('payload')->collate('utf8mb4_unicode_ci'); // Вариант longtext
            $table->unsignedInteger('last_activity'); // Вариант int UNSIGNED
            $table->unsignedInteger('user_id')->nullable(); // Вариант int UNSIGNED DEFAULT NULL
            $table->string('ip_address', 45)->nullable()->collate('utf8mb4_unicode_ci'); // Вариант varchar(45) DEFAULT NULL
            $table->string('user_agent')->nullable()->collate('utf8mb4_unicode_ci'); // Вариант varchar(255) DEFAULT NULL

            // Индекс для 'id', если требуется уникальность
            $table->primary('id'); // Задаем первичный ключ
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
