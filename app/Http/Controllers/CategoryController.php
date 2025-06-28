<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
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
        $allowedColumns = ['id', 'category', 'slug'];
        $allowedDirs = ['asc', 'desc'];

        $orderBy = in_array($request->input('order_by'), $allowedColumns) ? $request->input('order_by') : 'id';
        $orderDir = in_array($request->input('order_dir'), $allowedDirs) ? $request->input('order_dir') : 'asc';

        $categories = Category::query()
            ->when($search, function ($query, $search) {
                $query->where('category', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->orderBy($orderBy, $orderDir)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('category/index', [
            'req' => $request->all(),
            'categories' => $categories,
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
        return Inertia::render('category/form', compact([

        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'required|unique:categories,slug',
            'category' => 'required',
        ]);

        $category = new Category;
        $category->slug = $request->slug;
        $category->category = $request->category;
        $category->save();

        return redirect()->route('category.index')->with('success', 'Category berhasil disimpan.');
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
    public function edit(Category $category)
    {
        return Inertia::render('category/form', compact([
            'category',
        ]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'slug' => 'required|unique:categories,slug,'.$category->id,  // Menambahkan pengecualian untuk category yang sedang diperbarui
            'category' => 'required',
        ]);

        $category->slug = $request->slug;
        $category->category = $request->category;
        $category->save();

        return redirect()->route('category.index')->with('success', 'Category berhasil disimpan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Category $category)
    {
        $category->delete();

        return redirect()->route('category.index', $request->only([
            'search', 'per_page', 'order_by', 'order_dir', 'page',
        ]))->with('success', 'Category berhasil dihapus.');
    }
}
