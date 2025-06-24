'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

export default function ClientOnlyToaster() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <Toaster richColors position="top-right" />;
}
