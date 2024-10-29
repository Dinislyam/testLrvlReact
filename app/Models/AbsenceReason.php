<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceReason extends Model
{
    use HasFactory;

    protected $table = 'absence_reasons';

    protected $fillable = ['reason_name', 'is_respectful'];

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
