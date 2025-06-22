<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            AdminSeeder::class,
            CategorySeeder::class,
            TagSeeder::class,
            PostSeeder::class,
        ]);

        $this->createSampleUser();
    }

    private function createSampleUser() {
        $user = User::factory(['username' => 'admin', 'password' => 'admin'])->create();

        Admin::factory([
            'user_id' => $user->id,
            'name' => 'Admin',
        ])->create();

        $user->assignRole('admin');
    }
}
