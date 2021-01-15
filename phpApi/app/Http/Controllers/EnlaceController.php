<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enlace;

class EnlaceController extends Controller
{
    public function index(){
        $enlace=Enlace::all();
        return $enlace;
    }
   
  
    public function created(Request $request){

      $enlace = new Task();
      
      $enlace->idproducto=$request->idproducto;
      $enlace->usertask=$request->usertask;
      $enlace->tecnica=$request->tecnica;
      $enlace->seguridad=$request->seguridad;
      
     
      

      
      $enlace->save();
      return $enlace;
  }
}



