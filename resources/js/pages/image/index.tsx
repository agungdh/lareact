import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Image',
        href: '/image',
    },
];

export default function Index({ images }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />
            <a href="/image/create">Tambah</a>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Filename</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {images.map((image) => (
                        <TableRow key={image.id}>
                            <TableCell>{image.id}</TableCell>
                            <TableCell>{image.name}</TableCell>
                            <TableCell>{image.status}</TableCell>
                            <TableCell>{image.description}</TableCell>
                            <TableCell>
                                {image.status === 'ready' && (
                                    <a href={image.url} target="_blank">
                                        <button>Preview</button>
                                    </a>
                                )}
                                <button>Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
