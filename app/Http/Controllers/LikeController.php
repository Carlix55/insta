<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $user = auth()->user();
    
        $like = $post->likes()->where('user_id', $user->id);
    
        if ($like->exists()) {
            $like->delete();
        } else {
            $post->likes()->create([
                'user_id' => $user->id,
            ]);
        }
    
        return back(); // Esto no redirige gracias a preserveScroll
    }
    
}
