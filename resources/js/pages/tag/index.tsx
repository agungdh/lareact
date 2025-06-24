import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tag',
        href: '/tag',
    },
];

export default function Index() {
    const { tags } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <section className="w-full space-y-12">
                        <div className="space-y-6">
                            <a href="/tag/create">Tambah</a>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Tag</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tags.data.map((tag) => (
                                        <TableRow key={tag.id}>
                                            <TableCell>{tag.slug}</TableCell>
                                            <TableCell>{tag.tag}</TableCell>
                                            <TableCell>
                                                <button>Delete</button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="mt-4 flex gap-4">
                                {tags.prev_page_url && (
                                    <a
                                        href={tags.prev_page_url}
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        Prev
                                    </a>
                                )}
                                {tags.next_page_url && (
                                    <a
                                        href={tags.next_page_url}
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        Next
                                    </a>
                                )}
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
