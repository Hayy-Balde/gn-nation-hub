<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PaysController;
use App\Http\Controllers\DeviseController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\CommuneController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SecteurController;
use App\Http\Controllers\QuartierController;
use App\Http\Controllers\PrefectureController;

Route::get('/', [HomeController::class, 'index'])->name('home.index');

// Liste publique des entités
// Route::get('/pays', [PaysController::class, 'index'])->name('pays.index.public');
// Route::get('/devises', [DeviseController::class, 'index'])->name('devises.index.public');
Route::get('/regions', [RegionController::class, 'index'])->name('regions.index.public');
Route::get('/regions/{region}', [RegionController::class, 'showPublic'])->name('regions.index.prefecture.public');

Route::get('/prefectures', [PrefectureController::class, 'index'])->name('prefectures.index.public');
Route::get('/prefectures/{prefecture}', [PrefectureController::class, 'showPublic'])->name('prefectures.index.commune.public');

Route::get('/communes', [CommuneController::class, 'index'])->name('communes.index.public');
Route::get('/communes/{commune}', [CommuneController::class, 'showPublic'])->name('communes.index.quartier.public');

Route::get('/quartiers', [QuartierController::class, 'index'])->name('quartiers.index.public');
Route::get('/quartiers/{quartier}', [QuartierController::class, 'showPublic'])->name('quartiers.index.secteur.public');

Route::get('/secteurs', [SecteurController::class, 'index'])->name('secteurs.index.public');


Route::get('/admin', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // CRUD complet
    Route::resource('pays', PaysController::class)->except(['index']);
    Route::resource('devises', DeviseController::class)->except(['index']);
    Route::resource('regions', RegionController::class)->except(['index']);
    Route::resource('prefectures', PrefectureController::class)->except(['index']);
    Route::resource('communes', CommuneController::class)->except(['index']);
    Route::resource('quartiers', QuartierController::class)->except(['index']);
    Route::resource('secteurs', SecteurController::class)->except(['index']);
});
require __DIR__.'/auth.php';
