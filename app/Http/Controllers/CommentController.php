<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required|string|max:255',
        ]);
    
        $post->comments()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);
    
        return back(); // igual, no redirige en el frontend
    }
    

}
