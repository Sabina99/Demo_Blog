<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['cors'])->post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');

Route::middleware(['cors'])->get('/articles', [\App\Http\Controllers\ArticleController::class, 'index']);
Route::middleware(['cors'])->get('/articles/{id}', [\App\Http\Controllers\ArticleController::class, 'show']);
Route::middleware(['cors'])->post('/articles', [\App\Http\Controllers\ArticleController::class, 'store'])->middleware('jwt.auth');

Route::middleware(['cors'])->put('/articles/{id}', [\App\Http\Controllers\ArticleController::class, 'update'])->middleware('jwt.auth');
Route::middleware(['cors'])->put('/articles/{id}', [\App\Http\Controllers\ArticleController::class, 'update'])->middleware('jwt.auth');

Route::middleware(['cors'])->get('/categories', [\App\Http\Controllers\CategoryController::class, 'index']);
Route::middleware(['cors'])->get('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'show']);

Route::middleware(['cors'])->get('/tags', [\App\Http\Controllers\TagController::class, 'index']);
Route::middleware(['cors'])->get('/tags/{id}', [\App\Http\Controllers\TagController::class, 'show'])->middleware('jwt.auth');
