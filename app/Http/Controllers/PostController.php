<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index() {
        return inertia('post/index', [
            'posts' => Post::all(),
        ]);
    }
}
