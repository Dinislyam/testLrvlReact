<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;

    protected $table = 'absences';

    protected $fillable = ['group_id', 'students_in_group', 'students_on_inplan', 'students_fact', 'date_reported'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
