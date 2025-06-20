<?php

namespace App\Http\Controllers;

use App\Jobs\OptimizeImage;
use App\Models\File;
use App\Service\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function __construct(private readonly FileService $fileService)
    {
    }

    public function index()
    {
        $images = File::where('type', 'image')->orderByDesc('id')->get();

        return Inertia::render('image/index', compact([
            'images',
        ]));
    }

    public function show(File $image)
    {
        return redirect(
            Storage::temporaryUrl(
                $image->path,
                now()->addMinutes(5),
                [
                    'ResponseContentDisposition' => 'inline; filename=' . $image->name,
                ]
            )
        );
    }

    public function create()
    {
        return Inertia::render('image/create');
    }

    public function store(Request $request) {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        DB::transaction(function () use ($request) {
            $file = new File();
            $file->type = 'image';
            $file->status = 'uploading';
            $file->name = $request->file('image')->getClientOriginalName();
            $file->path = '';
            $file->description = $request->description;
            $file->save();

            $path = $request->file('image')->storeAs('file', $file->id . '_raw');

            $file->path = $path;
            $file->status = 'uploaded';
            $file->save();

            OptimizeImage::dispatch($file);
        });

        return redirect()->route('image.index')->with('success', 'Image uploaded successfully.');
    }
}
