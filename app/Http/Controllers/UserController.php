<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function followersPage()
{
    $user = auth()->user();

    return Inertia::render('User/Followers', [
        'followers' => $user->followers()->with('follower')->get()->map(function ($follow) {
            return [
                'id' => $follow->follower->id,
                'name' => $follow->follower->name,
                'email' => $follow->follower->email,
            ];
        }),
        'following' => $user->followings()->with('followed')->get()->map(function ($follow) {
            return [
                'id' => $follow->followed->id,
                'name' => $follow->followed->name,
                'email' => $follow->followed->email,
            ];
        }),
    ]);
}
}
