<?php

use Illuminate\Support\Facades\Route;
// Рендеринг приложения на любом маршруте
Route::view('/{any?}', 'app')->where('any', '.*');
