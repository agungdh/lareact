import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tag',
        href: '/tag',
    },
];

export default function Index() {
    const { tags, filters } = usePage().props;
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    function handleSearch(e) {
        e.preventDefault();
        get('/tag', {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <section className="w-full space-y-12">
                        <div className="space-y-6">

                            <div className="mb-4 flex justify-between items-center">
                                {/* Tombol tambah data di kiri */}
                                <a
                                    href="/tag/create"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    + Tambah Tag
                                </a>

                                {/* Form search di kanan */}
                                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="px-3 py-2 border rounded w-64"
                                        placeholder="Cari tag atau slug..."
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Cari
                                    </button>
                                </form>
                            </div>

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
