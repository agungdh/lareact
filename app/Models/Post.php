<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;
use Parsedown;

class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, Searchable;

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function toSearchableArray(): array
    {
        $Parsedown = new Parsedown();

        $html = $Parsedown->text($this->content);
        $plainText = strip_tags($html);

        return [
            'title' => $this->title,
            'content' => $plainText,
        ];
    }

    public function shouldBeSearchable(): bool
    {
        return $this->status === 'published';
    }
}
