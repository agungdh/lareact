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
//        dd($request->all());
        $search = $request->input('search');
        $perPage = min((int) $request->input('per_page', 10), 100);

        // Whitelist kolom dan arah sort
        $allowedColumns = ['id', 'tag', 'slug'];
        $allowedDirs = ['asc', 'desc'];

        $orderBy = in_array($request->input('order_by'), $allowedColumns) ? $request->input('order_by') : 'id';
        $orderDir = in_array($request->input('order_dir'), $allowedDirs) ? $request->input('order_dir') : 'asc';

        $tags = Tag::query()
            ->when($search, function ($query, $search) {
                $query->where('tag', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->orderBy($orderBy, $orderDir)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('tag/index', [
            'req' => $request->all(),
            'tags' => $tags,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
                'order_by' => $orderBy,
                'order_dir' => $orderDir,
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
    public function edit(Tag $tag)
    {
        return Inertia::render('tag/form', compact([
            'tag',
        ]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'slug' => 'required|unique:tags,slug,' . $tag->id,  // Menambahkan pengecualian untuk tag yang sedang diperbarui
            'tag' => 'required',
        ]);

        $tag->slug = $request->slug;
        $tag->tag = $request->tag;
        $tag->save();

        return redirect()->route('tag.index')->with('message', 'Tag berhasil disimpan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Tag::query()->findOrFail($id)->delete();
    }
}
