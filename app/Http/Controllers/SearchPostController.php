<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class SearchPostController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $posts = Post::search($request->search);

        if ($request->categories && is_array($request->categories) && count($request->categories) > 0) {
            $posts = $posts->whereIn('category_id', $request->categories);
        }

        if ($request->tags && is_array($request->tags) && count($request->tags) > 0) {
            $posts = $posts->whereIn('tag_id', $request->tags);
        }

        return $posts->paginate();
    }
}
