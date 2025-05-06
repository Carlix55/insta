<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FollowController;
use Illuminate\Support\Facades\Auth;

// Página de bienvenida
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Rutas públicas (guest)
Route::middleware(['guest'])->group(function () {
    Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
    Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

// Rutas protegidas (auth)
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Feed (ver todos los posts)
    Route::get('/feed', [PostController::class, 'index'])->name('feed');

    // Mis Posts
    Route::get('/my-posts', [PostController::class, 'myPosts'])->name('posts.mine');

    // CRUD Posts
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::resource('posts', PostController::class)->except(['create', 'show']);

    // Likes y Comentarios
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle'])->name('posts.like');
    Route::post('/posts/{post}/comment', [CommentController::class, 'store'])->name('posts.comment');

    // Seguir / dejar de seguir
    Route::post('/follow/{user}', [FollowController::class, 'toggle'])->name('user.follow');


    // Ver seguidores y seguidos
    Route::get('/followers', [FollowController::class, 'index'])->name('followers.index');
});
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
})->name('logout');
require __DIR__.'/auth.php';
