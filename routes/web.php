<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchPostController;
use App\Http\Controllers\ShowPostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::post('/search', SearchPostController::class);
Route::get('/blog', [BlogController::class, 'index']);
Route::get('/blog/{post:slug}', [BlogController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('surimbim', function () {
        return Inertia::render('surimbim');
    })->name('surimbim');

    Route::resource('/post', PostController::class);
    Route::resource('/image', ImageController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
