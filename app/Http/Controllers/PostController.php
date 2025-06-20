<?php

namespace App\Http\Controllers;

use App\Jobs\OptimizeImage;
use App\Models\Category;
use App\Models\File;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
        return Inertia::render('post/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:posts,slug',
            'post_content' => 'required',
        ]);

        DB::transaction(function () use ($request) {
            $post = new Post;
            $post->title = $request->title;
            $post->slug = $request->slug;
            $post->content = $request->post_content;
            $post->status = 'published';
            $post->save();

            if ($request->has('tags')) {
                $tags = explode(',', $request->tags);
                $tagIds = [];

                foreach ($tags as $tag) {
                    if (trim($tag) !== '') {
                        $tag = Str::slug(trim($tag));

                        $newTag = new Tag();
                        $newTag->slug = Str::replace(' ', '-', $tag);
                        $newTag->tag = $tag;
                        $newTag->save();

                        $tagIds[] = $newTag->id;
                    }
                }

                $post->tags()->sync($tagIds);
            }

            if ($request->has('categories')) {
                $categories = explode(',', $request->categories);
                $categoryIds = [];
                foreach ($categories as $category) {
                    if (trim($category) !== '') {
                        $category = Str::slug(trim($category));

                        $newCategory = new Category();
                        $newCategory->slug = Str::replace(' ', '-', $category);
                        $newCategory->category = $category;
                        $newCategory->save();

                        $categoryIds[] = $newCategory->id;
                    }
                }

                $post->categories()->sync($categoryIds);
            }
        });

        return redirect()->route('post.index');
    }
}
