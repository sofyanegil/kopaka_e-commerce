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

        // route order history
        Route::get('orders', 'App\Http\Controllers\Account\OrderHistoryController@index')->name('account.orders_history.index')->middleware('permission:orderHistory.index');
        Route::get('orders/{invoice}', 'App\Http\Controllers\Account\OrderHistoryController@show')->name('account.orders_history.show')->middleware('permission:orderHistory.show');
    });

    // route admin
    Route::prefix('admin')->group(function () {
        //route resource permissions
        Route::resource('/permissions', \App\Http\Controllers\Admin\PermissionController::class, ['as' => 'admin'])
            ->middleware('permission:permissions.index|permissions.create|permissions.delete');
        //route resource roles
        Route::resource('/roles', \App\Http\Controllers\Admin\RoleController::class, ['as' => 'admin'])
            ->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');
        //route resource users
        Route::resource('/users', \App\Http\Controllers\Admin\UserController::class, ['as' => 'admin'])
            ->middleware('permission:users.index|users.edit|users.delete');
        //route resource store
        Route::resource('/stores', \App\Http\Controllers\Admin\StoreController::class, ['as' => 'admin'])
            ->middleware('permission:stores.index|stores.create|stores.edit|stores.delete');
        //route resource delivery_areas
        Route::resource('/delivery_areas', \App\Http\Controllers\Admin\DeliveryAreaController::class, ['as' => 'admin'])
            ->middleware('permission:deliveryAreas.index|deliveryAreas.create|deliveryAreas.edit|deliveryAreas.delete');
        //route resource sliders
        Route::resource('/sliders', \App\Http\Controllers\Admin\SliderController::class, ['as' => 'admin'])
            ->middleware('permission:sliders.index|sliders.create|sliders.delete');
        //route resource categories
        Route::resource('/categories', \App\Http\Controllers\Admin\CategoryController::class, ['as' => 'admin'])
            ->middleware('permission:categories.index|categories.create|categories.edit|categories.delete');
        //route resource products
        Route::resource('/products', \App\Http\Controllers\Admin\ProductController::class, ['as' => 'admin'])
            ->middleware('permission:products.index|products.show|products.create|products.edit|products.delete');

        //route store image product
        Route::post('/products/store_image_product', [\App\Http\Controllers\Admin\ProductController::class, 'storeImageProduct'])->name('admin.products.store_image_product');

        //route destroy image product
        Route::delete('/products/destroy_image_product/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'destroyImage'])->name('admin.products.destroy_image_product');


        Route::resource('/orders', \App\Http\Controllers\Admin\OrderController::class, ['as' => 'admin'])
            ->middleware('permission:orders.index|orders.show|orders.edit');

        //route dashboard
        Route::get('/dashboard', App\Http\Controllers\Admin\DashboardController::class)->name('admin.dashboard');
    });
});

// route home
Route::get('/', 'App\Http\Controllers\Web\HomeController')->name('web.home.index');

// route category
Route::get('/categories', 'App\Http\Controllers\Web\CategoryController@index')->name('web.categories.index');
Route::get('/categories/{category:category_slug}', 'App\Http\Controllers\Web\CategoryController@show')->name('web.categories.show');

// route product
Route::get('/products', 'App\Http\Controllers\Web\ProductController@index')->name('web.products.index');
Route::get('/products/{product:product_slug}', 'App\Http\Controllers\Web\ProductController@show')->name('web.products.show');
