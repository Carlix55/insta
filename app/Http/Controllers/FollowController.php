<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
 
use Illuminate\Http\Request;    

class FollowController extends Controller
{
    /**
     * Muestra los seguidores y los seguidos del usuario autenticado.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $user = auth()->user();
    
        $followers = $user->followers()->get();
        $following = $user->following()->get();
    
        return Inertia::render('User/Followers', [
            'followers' => $followers,
            'following' => $following,
        ]);
    }    
    

   /**
 * Seguir o dejar de seguir a un usuario.
 *
 * @param \App\Models\User $user
 * @return \Illuminate\Http\RedirectResponse
 */
public function toggle(User $user)
{
    $follower = auth()->user();

    // Verificar si el usuario intenta seguirse a sí mismo
    if ($follower->id === $user->id) {
        return back()->withErrors('No puedes seguirte a ti mismo.');
    }

    // Verificar si ya está siguiendo
    if ($follower->following()->where('user_id', $user->id)->exists()) {
        $follower->following()->detach($user->id); // Dejar de seguir
        $message = 'Dejaste de seguir a ' . $user->name . '.';
    } else {
        $follower->following()->attach($user->id); // Seguir
        $message = 'Comenzaste a seguir a ' . $user->name . '.';
    }

    // Redirigir a la vista de seguidores con un mensaje de éxito
    return redirect()->route('followers.index')->with('status', $message);
}
}