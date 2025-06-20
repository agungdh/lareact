<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;

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
        $array = $this->toArray();

        $array['tags'] = $this->tags->pluck('tag')->toArray();
        $array['categories'] = $this->categories->pluck('category')->toArray();

        return $array;
    }

    public function shouldBeSearchable(): bool
    {
        return $this->status === 'published';
    }
}
