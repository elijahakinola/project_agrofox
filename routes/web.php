<?php

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

Route::view('/','welcome');
Route::view('/{any}','welcome');
Route::view('/{any}/{date}','welcome');
Route::view('/{any}/{date}/{date2}','welcome');

Route::view('/{any}/{date1}/{date2}/{date3}','welcome');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
