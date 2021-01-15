<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    public function index(){
        $producto=Producto::all();
        return $producto;
    }
   
  
    
    public function new(Request $request){
      $url='http://dev1.colmenamkt.com/vicolors';
      $producto = new Producto();
      if ($producto !== null){
        $producto->fill($request->all());

        if ($request->hasfile('image')){
          $producto->image = $url.Storage::disk('public')->putFile('img/productos', $request->image, 'public');
        }
        else {
          $producto->image = $request->image;

        }
        $listo = $producto->save();
        if($listo){
          return response()->json([
            'status' => false,
            'message' => 'No se pudo crear'
          ]);
        }
      }
else{
  return response()->json([
    'status' => false,
    'message' => 'No existe producto'
  ]);
}
    }
}



