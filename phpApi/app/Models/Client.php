<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;




class Client extends Model
{
    protected $table = "clients";
    protected $fillable = [
        'name',
        'sales',
        'mail',
        'streetaddress',
        'state',
        'city',
        'region',
        'postalcode',

    ];
}

?>
