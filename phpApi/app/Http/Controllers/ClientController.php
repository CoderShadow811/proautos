<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;


class ClientController extends Controller
{
    public function index(){
        $user=Client::all();
        return $user;
    }
    public function created(Request $request){

        $client = new Client();
        
        $client->name=$request->name;
        $client->mail=$request->mail;
        $client->streetaddress=$request->streetaddress;
        $client->state=$request->state;
        $client->city=$request->city;
        $client->region=$request->region;
        $client->postalcode=$request->postalcode;
        $client->sales=$request->sales;
       
        

        
        $client->save();
        return $client;
    }
}
