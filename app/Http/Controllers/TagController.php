<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = min((int) $request->input('per_page', 10), 100);

        $tags = Tag::query()
            ->when($search, function ($query, $search) {
                $query->where('tag', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('tag/index', [
            'tags' => $tags,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tag/form', compact([

        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'required|unique:tags,slug',
            'tag' => 'required',
        ]);

        $tag = new Tag;
        $tag->slug = $request->slug;
        $tag->tag = $request->tag;
        $tag->save();

        return redirect()->route('tag.index')->with('message', 'Tag berhasil disimpan.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Tag::query()->findOrFail($id)->delete();

        return redirect()->back()->with('message', 'Tag berhasil dihapus.');
    }
}
