<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $posts = Post::with(['user', 'comments.user', 'likes'])
            ->withCount('likes')
            ->latest()
            ->get()
            ->map(function ($post) use ($user) {
                $post->liked_by_user = $post->likes->contains('user_id', $user->id);
                $post->user->is_followed = $user->following()->where('user_id', $post->user->id)->exists();
                return $post;
            });

        return Inertia::render('posts/Feed', [
            'posts' => $posts,
        ]);
    }

    public function myPosts()
    {
        $user = Auth::user();

        $posts = $user->posts()
            ->with(['user', 'comments.user', 'likes'])
            ->withCount('likes')
            ->latest()
            ->get()
            ->map(function ($post) use ($user) {
                $post->liked_by_user = $post->likes->contains('user_id', $user->id);
                $post->user->is_followed = $user->following()->where('user_id', $post->user->id)->exists();
                return $post;
            });

        return Inertia::render('posts/MyPosts', [
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
            'caption' => 'nullable|string|max:255',
        ]);

        $path = $request->file('image')->store('posts', 'public');

        Post::create([
            'user_id' => auth()->id(),
            'image' => $path,
            'caption' => $request->caption,
        ]);

        return redirect()->route('feed');
    }

    public function edit(Post $post)
    {
        return Inertia::render('posts/EditPost', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'caption' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($post->image);
            $post->image = $request->file('image')->store('posts', 'public');
        }

        $post->caption = $request->caption;
        $post->save();

        return redirect()->route('posts.mine');
    }

    public function destroy(Post $post)
    {
        Storage::disk('public')->delete($post->image);
        $post->delete();

        return redirect()->route('posts.mine');
    }
}