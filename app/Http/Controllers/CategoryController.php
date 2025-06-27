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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }
}
