<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('index');
});

// route register
Route::get('/register', 'App\Http\Controllers\Auth\RegisterController@index')->name('register')->middleware('guest');
Route::post('/register', 'App\Http\Controllers\Auth\RegisterController@store')->name('register.store')->middleware('guest');

// route login
Route::get('/login', 'App\Http\Controllers\Auth\LoginController@index')->name('login')->middleware('guest');
Route::post('/login', 'App\Http\Controllers\Auth\LoginController@store')->name('login.store')->middleware('guest');

// route logout
Route::post('/logout', 'App\Http\Controllers\Auth\LogoutController')->name('logout')->middleware('auth');

// route middleware auth
Route::middleware(['auth'])->group(function () {

    // route account
    Route::prefix('account')->group(function () {
        Route::get('profile', 'App\Http\Controllers\Account\ProfileController@index')->name('account.profile.index');
        Route::get('profile/edit', 'App\Http\Controllers\Account\ProfileController@edit')->name('account.profile.edit');
        Route::patch('profile/update', 'App\Http\Controllers\Account\ProfileController@update')->name('account.profile.update');
        Route::patch('profile/password', 'App\Http\Controllers\Account\ProfileController@updatePassword')->name('account.profile.changePassword');
    });
});
