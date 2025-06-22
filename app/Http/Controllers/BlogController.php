<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::with('categories', 'tags')
            ->orderByDesc('id')
            ->paginate(10);

        return inertia('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post)
    {
        $post->load('categories', 'tags');

        return $post;
    }
}
