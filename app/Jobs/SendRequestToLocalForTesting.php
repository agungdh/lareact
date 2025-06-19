<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendRequestToLocalForTesting implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private string $method)
    {
        //
    }

    /**
     * Execute the job.
     * @throws ConnectionException
     */
    public function handle(): void
    {
        switch ($this->method) {
            case 'POST':
                Http::get(config('app.url') . '/sur', [
                    'init_at' => date('Y-m-d H:i:s'),
                    'init_at_2' => now(),
                ]);
                break;
            case 'GET':
                Http::get(config('app.url') . '/');
                break;
            default:
                break;
        }
    }
}
