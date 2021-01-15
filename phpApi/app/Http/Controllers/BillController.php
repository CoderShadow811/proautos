<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bill;


class BillController extends Controller
{
    public function index(){
        $bill=Bill::all();
        return $bill;
    }
    public function created(Request $request){

        $bill = new Bill();
        
        $bill->name=$request->name;
        $bill->mail=$request->mail;
        $bill->streetaddress=$request->streetaddress;
        $bill->state=$request->state;
        $bill->city=$request->city;
        $bill->region=$request->region;
        $bill->postalcode=$request->postalcode;
        $bill->webdesign=$request->webdesign;
        $bill->webdesigntotal=$request->webdesigntotal;
        $bill->digitalmarketing=$request->digitalmarketing;
        $bill->digitalmarketingtotal=$request->digitalmarketingtotal;
        $bill->audiovisual=$request->audiovisual;
        $bill->audiovisualtotal=$request->audiovisualtotal;
        $bill->graphicdesign=$request->graphicdesign;
        $bill->graphicdesigntotal=$request->graphicdesigntotal;
        $bill->branding=$request->branding;
        $bill->brandingtotal=$request->brandingtotal;
        $bill->marketingstrategies=$request->marketingstrategies;
        $bill->marketingstrategiestotal=$request->marketingstrategiestotal;
        $bill->statebilling=$request->statebilling;
        $bill->statevariant=$request->statevariant;
        $bill->total=$request->total;
        

        
        $bill->save();
        return $bill;
    }
}
