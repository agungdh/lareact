<?php

namespace App\Jobs;

use App\Models\File;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class OptimizeImage implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public File $file)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->file->status = 'optimizing';
        $this->file->save();

        $oldPath = $this->file->path;

        $image = Image::read(Storage::get($oldPath));

        $path = Str::replace('_raw', '', $oldPath);
        Storage::put(
            $path,
            $image->toWebp(70, true)
        );

        $this->file->path = $path;
        $this->file->status = 'ready';
        $this->file->name = Str::uuid() . '.webp'; // Rename to a unique name
        $this->file->save();

        Storage::delete($oldPath);
    }
}
