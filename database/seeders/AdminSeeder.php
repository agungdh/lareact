<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(100)->create()->each(function ($user) {
            Admin::factory([
                'user_id' => $user->id,
            ])->create();

            $user->assignRole('admin');
        });
    }
}
