<?php

namespace App;

use Illuminate\Support\Facades\Log;

trait AddLogRequestId
{
    public function addRequestId($requestId): void{
        Log::getLogger()->pushProcessor(function ($record) use ($requestId) {
            $record['extra']['surimbim_request_id'] = $requestId;

            return $record;
        });
    }
}
