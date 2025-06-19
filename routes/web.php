<?php

use App\Http\Controllers\PostController;
use App\Jobs\LogHeader;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    Log::info('surimbim', [
        'kapan' => date('Y-m-d H:i:s'),
    ]);

    LogHeader::dispatch(request()->headers->get('X-Request-Id'), request()->header());

    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('surimbim', function () {
        return Inertia::render('surimbim');
    })->name('surimbim');

    Route::resource('/post', PostController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
