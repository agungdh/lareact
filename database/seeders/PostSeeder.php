<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory(100)->create()->each(function (Post $post) {
            $post->categories()->attach(
                Category::inRandomOrder()->take(rand(1, 3))->pluck('id')->toArray()
            );

            $post->tags()->attach(
                Tag::inRandomOrder()->take(rand(1, 5))->pluck('id')->toArray()
            );
        });
    }
}
