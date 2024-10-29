<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StudentInfoController;
use App\Http\Controllers\API\GroupController;
use App\Http\Controllers\API\AbsenceReasonController;

Route::prefix('api')->group(function () {
    Route::apiResource('absence-reasons', AbsenceReasonController::class);
    Route::apiResource('groups', GroupController::class);
    Route::apiResource('group-attendance', GroupController::class);
});
