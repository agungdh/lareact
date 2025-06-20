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

        $image = Image::read(Storage::get($this->file->path));

        $path = Str::random();
        Storage::put(
            $path,
            $image->encodeByExtension(\Illuminate\Support\Facades\File::extension($this->file->name), quality: 70)
        );

        $this->file->path = $path;
        $this->file->status = 'ready';
        $this->file->save();
    }
}
