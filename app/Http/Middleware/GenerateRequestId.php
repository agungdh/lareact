<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class GenerateRequestId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Generate a unique request ID
        $requestId = (string) Str::uuid();

        // Add the request ID to the request object
        $request->headers->set('X-Request-Id', $requestId);
        $request->headers->set('Surimbim', $requestId);

        return $next($request);
    }
}
