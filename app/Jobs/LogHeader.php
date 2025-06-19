<?php

namespace App\Jobs;

use App\AddLogRequestId;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class LogHeader implements ShouldQueue
{
    use Queueable;
    use AddLogRequestId;

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
        $this->addRequestId($this->requestId);

        Log::info('Helo helo: '.date('Y-m-d H:i:s'));
        Log::info('biar ngelog aja gasi gengs', $this->headers);
    }
}
