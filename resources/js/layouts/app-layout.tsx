import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { flash } = usePage().props;

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {/* Flash message */}
            {flash?.message && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-800 shadow">
                    {flash.message}
                </div>
            )}

            {children}
        </AppLayoutTemplate>
    );
};
