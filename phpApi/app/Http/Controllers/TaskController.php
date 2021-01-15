<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;


class TaskController extends Controller
{
    public function index(){
        $task=Task::all();
        return $task;
    }
    public function created(Request $request){

        $task = new Task();
        
        $task->nametask=$request->nametask;
        $task->usertask=$request->usertask;
        
        $task->text=$request->text;
        
       
        

        
        $task->save();
        return $task;
    }
   public function update(Request $request) {
        $task = Task::where('id', '=', $request->input('id'))->first();
        if ($task) {
            if ($request->input('status')) {
                $task->status = $request->input('status');
            }
            if ($request->input('text')) {
                $taskser->text = $request->input('text');
            }
            if ($task->save()) {
                return response()->json($task, 200);
            } else {
                return response()->json(['error' => 'Error al acualizar el registro'], 400);
            }
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 400);
        }
    }
    
}
