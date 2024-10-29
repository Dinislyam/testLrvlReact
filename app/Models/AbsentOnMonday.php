<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsentOnMonday extends Model
{
    use HasFactory;

    protected $table = 'absent_on_monday';

    protected $fillable = ['group_name', 'student_name', 'date_reported', 'created_at'];
}
