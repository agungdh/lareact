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
        // Cek apakah request sudah memiliki header X-Request-Id
        $requestId = $request->header('X-Request-Id');

        // Jika belum ada, generate request ID baru
        if (!$requestId) {
            $requestId = (string) Str::uuid();
        }

        // Tambahkan request ID ke request object
        $request->headers->set('X-Request-Id', $requestId);

        // Proses request ke middleware berikutnya dan ambil response
        $response = $next($request);

        // Tambahkan request ID ke response header jika belum ada
        if (!$response->headers->has('X-Request-Id')) {
            $response->headers->set('X-Request-Id', $requestId);
        }

        // Opsional: log request ID untuk keperluan tracing
        \Log::info('Request ID: ' . $requestId);

        return $response;
    }
}
