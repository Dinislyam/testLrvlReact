<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';

    protected $fillable = ['full_name', 'group_id', 'absence_id', 'reason_id'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function absence()
    {
        return $this->belongsTo(Absence::class);
    }

    public function reason()
    {
        return $this->belongsTo(AbsenceReason::class);
    }
}
