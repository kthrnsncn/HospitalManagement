<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']); // Route to get all users
Route::put('/users/{id}', [UserController::class, 'update']); // Route to update a user
Route::delete('/removeUser/{id}', [UserController::class, 'destroy']); // Route to delete a user
Route::get('/users/{id}', [UserController::class, 'show']);


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
});

// For doctor api end points
Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/doctors/{id}', [DoctorController::class, 'show']);
Route::get('/doctorsEmail/{email}', [DoctorController::class, 'showEmail']);
Route::post('/addDoctors', [DoctorController::class, 'store']);
Route::put('/doctors/{id}', [DoctorController::class, 'update']);
Route::delete('/removeDoctor/{id}', [DoctorController::class, 'destroy']);

