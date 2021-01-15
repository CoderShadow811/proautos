<?php

header('Access-Control-Allow-Origin');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

/*$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}*/
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return response()->json(['message' => 'Api root'], 200);
});


/**
 * |
 * |
 * |USERS
 * |
 * |
 */
$router->get('/clients', 'ClientController@index');

$router->post('/clients', 'ClientController@created');

$router->put('/clients', 'ClientController@created');
/**
 * |
 * |
 * |USERS
 * |
 * |
 */







/**
 * |
 * |
 * |Billing
 * |
 * |
 */
$router->get('/billing', 'BillController@index');

$router->post('/billing', 'BillController@created');

$router->put('/billing', 'BillController@created');
/**
 * |
 * |
 * |Billing
 * |
 * |
 */
/**
 * |
 * |
 * |Tasks
 * |
 * |
 */
$router->get('/tasks', 'TaskController@index');

$router->post('/tasks', 'TaskController@created');

$router->put('/tasks', 'TaskController@update');
/**
 * |
 * |
 * |Tasks
 * |
 * |
 */


$router->get('/productos', 'ProductoController@index');
//$router->post('/productos', 'ProductoController@created');
$router->post('/productos/nuevo', 'ProductoController@store');

$router->get('/productos/categorias', 'CategoriaController@index');
$router->get('/productos/subcategoria', 'SubcategoriaController@index');
$router->get('/productos/division', 'DivisionController@index');