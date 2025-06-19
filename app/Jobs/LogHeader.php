<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class LogHeader implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private string $requestId, private array $headers = [])
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::getLogger()->pushProcessor(function ($record) {
            $record['extra']['surimbim_request_id'] = $this->requestId;

            return $record;
        });

        Log::info('Helo helo: '.date('Y-m-d H:i:s'));
        Log::info('biar ngelog aja gasi gengs', $this->headers);
    }
}
