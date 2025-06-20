<?php

namespace App\Http\Controllers;

use App\Jobs\OptimizeImage;
use App\Models\File;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('tags', 'categories')->where('status', 'published')->orderByDesc('id')->get();

        return inertia('post/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post)
    {
        return $post;
    }

    public function create()
    {
        return Inertia::render('image/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        DB::transaction(function () use ($request) {
            $file = new File;
            $file->type = 'image';
            $file->status = 'uploading';
            $file->name = $request->file('image')->getClientOriginalName();
            $file->path = '';
            $file->description = $request->description;
            $file->save();

            $path = $request->file('image')->storeAs('file', $file->id);

            $file->path = $path;
            $file->status = 'uploaded';
            $file->save();

            OptimizeImage::dispatch($file);
        });

        return redirect()->route('image.index')->with('success', 'Image uploaded successfully.');
    }
}
