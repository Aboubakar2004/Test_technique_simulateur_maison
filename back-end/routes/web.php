<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route de login pour l'authentification
Route::get('/login', function () {
    return response()->json(['message' => 'Please use API authentication']);
})->name('login');
