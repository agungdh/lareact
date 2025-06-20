<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index()
    {
        $images = File::all();

        return Inertia::render('image/index', compact([
            'images',
        ]));
    }
}
