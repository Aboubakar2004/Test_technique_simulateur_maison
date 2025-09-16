<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SimulationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/test', function () {
    return response()->json(['message' => 'API fonctionne']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::post('/simulation/save', [SimulationController::class, 'save']);
    Route::get('/simulation/history', [SimulationController::class, 'getUserSimulations']);
    Route::delete('/simulation/{id}', [SimulationController::class, 'deleteSimulation']);
});