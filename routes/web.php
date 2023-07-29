<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/articles', [\App\Http\Controllers\ArticleController::class, 'index']);
Route::get('/articles/{id}', [\App\Http\Controllers\ArticleController::class, 'show']);
Route::post('/articles', [\App\Http\Controllers\ArticleController::class, 'store'])->middleware('jwt.auth');
Route::put('/articles/{id}', [\App\Http\Controllers\ArticleController::class, 'update'])->middleware('jwt.auth');

Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index'])->middleware('jwt.auth');
Route::get('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'show'])->middleware('jwt.auth');

Route::get('/tags', [\App\Http\Controllers\TagController::class, 'index'])->middleware('jwt.auth');;
Route::get('/tags/{id}', [\App\Http\Controllers\TagController::class, 'show'])->middleware('jwt.auth');;
