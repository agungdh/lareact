import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Image',
        href: '/image',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Filename</TableHead>
                        <TableHead>Size</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Paid</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </AppLayout>
    );
}
