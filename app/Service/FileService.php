<?php

namespace App\Service;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class FileService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getFileSize(string $path) {
        return Storage::size($path);
    }

    public function setFileSize(&$file) {
        $file->size = $this->getFileSize($file->path);
    }

    public function setFileSizes(Collection &$files) {
        $files->each(function ($file) {
            $this->setFileSize($file);
        });
    }
}
