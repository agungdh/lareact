<?php

namespace App\Http\Controllers;

use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return inertia('post/index', [
            'posts' => Post::all(),
        ]);
    }
}
