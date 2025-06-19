<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AddRequestIdToRequestAttribute
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $requestId = $request->headers->get('X-Request-Id');

        // Tambahkan request_id ke dalam context log secara global
        Log::getLogger()->pushProcessor(function ($record) use ($requestId) {
            $record['extra']['request_id'] = $requestId;
            return $record;
        });

        Log::info('sury');

        // Set request_id ke dalam request untuk akses lebih lanjut
        $request->attributes->set('request_id', $requestId);

        return $next($request);
    }
}
