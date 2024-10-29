<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $table = 'groups';

    protected $fillable = ['group_name', 'is_professional', 'building_id'];

    public function building()
    {
        return $this->belongsTo(Building::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
