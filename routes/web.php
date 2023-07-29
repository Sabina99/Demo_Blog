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
Route::post('/articles', [\App\Http\Controllers\ArticleController::class, 'store']);
Route::put('/articles/{id}', [\App\Http\Controllers\ArticleController::class, 'update']);

Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index']);
Route::get('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'show']);

Route::get('/tags', [\App\Http\Controllers\TagController::class, 'index']);
Route::get('/tags/{id}', [\App\Http\Controllers\TagController::class, 'show']);
