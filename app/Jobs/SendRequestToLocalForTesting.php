<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
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
     */
    public function handle(): void
    {
        Log::info('Sending request to local server', [
            'method' => $this->method,
            'timestamp' => date('Y-m-d H:i:s'),
        ]);

        switch ($this->method) {
            case 'POST':
                Http::post(url('/'), [
                    'init_at' => date('Y-m-d H:i:s'),
                    'init_at_2' => now(),
                ]);
                break;
            case 'GET':
                Http::get(url('/'));
                break;
            default:
                break;
        }
    }
}
