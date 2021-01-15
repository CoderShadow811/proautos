<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;




class Bill extends Model
{
    protected $table = "billing";
    protected $fillable = [
        'name',
        'mail',
        'streetaddress',
        'state',
        'city',
        'region',
        'postalcode',
        'webdesign',
        'webdesigntotal',
        'digitalmarketing',
        'digitalmarketingtotal',
        'audiovisual',
        'audiovisualtotal',
        'graphicdesign',
        'graphicdesigntotal',
        'branding',
        'brandingtotal',
        'marketingstrategies',
        'marketingstrategiestotal',
        'statebilling',
        'statevariant',
        'total'
    ];
}

?>
