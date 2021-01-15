<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;




class Enlace extends Model
{
    protected $table = "enlaces";
    protected $fillable = [
        'idproducto',
        'tecnica',
        'seguridad',
      

    ];
}

?>








