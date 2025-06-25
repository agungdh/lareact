import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

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

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/tag',
            {
                search: data.search,
                per_page: filters.per_page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePerPageChange = (e) => {
        const perPage = Math.min(parseInt(e.target.value), 100);
        router.get(
            '/tag',
            {
                search: data.search,
                per_page: perPage,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePaginate = (url) => {
        router.get(
            url,
            {
                search: filters.search,
                per_page: filters.per_page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (id) => {
        if (confirm('Apakah kamu yakin ingin menghapus tag ini?')) {
            router.delete(`/tag/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const toggleOrder = (column: string) => {
        const isSame = filters.order_by === column;
        const newDir = isSame && filters.order_dir === 'asc' ? 'desc' : 'asc';

        router.get(route('tag.index'), {
            page: 1, // reset ke halaman pertama
            per_page: filters.per_page ?? 10,
            search: filters.search ?? '',
            order_by: column,
            order_dir: newDir,
        }, {
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <section className="w-full space-y-12">
                        <div className="space-y-6">
                            <div className="mb-4 flex items-center justify-between">
                                {/* Tombol tambah */}
                                <Link href="/tag/create" className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                                    + Tambah Tag
                                </Link>

                                {/* Per Page + Search */}
                                <div className="flex items-center gap-4">
                                    <select value={filters.per_page || 10} onChange={handlePerPageChange} className="rounded border px-2 py-1">
                                        {[10, 25, 50, 100].map((option) => (
                                            <option key={option} value={option}>
                                                {option} per halaman
                                            </option>
                                        ))}
                                    </select>

                                    <form onSubmit={handleSearch} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            className="w-64 rounded border px-3 py-2"
                                            placeholder="Cari tag atau slug..."
                                        />
                                        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                            Cari
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Tabel */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead onClick={() => toggleOrder('id')}>ID</TableHead>
                                        <TableHead onClick={() => toggleOrder('slug')}>Slug</TableHead>
                                        <TableHead onClick={() => toggleOrder('tag')}>Tag</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tags.data.map((tag) => (
                                        <TableRow key={tag.id}>
                                            <TableCell>{tag.id}</TableCell>
                                            <TableCell>{tag.slug}</TableCell>
                                            <TableCell>{tag.tag}</TableCell>
                                            <TableCell>
                                                <button onClick={() => handleDelete(tag.id)} className="text-red-500 hover:underline">
                                                    Delete
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination & Info */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex gap-2">
                                    {tags.prev_page_url && (
                                        <button onClick={() => handlePaginate(tags.prev_page_url)} className="rounded bg-gray-200 px-3 py-1">
                                            Prev
                                        </button>
                                    )}
                                    {tags.next_page_url && (
                                        <button onClick={() => handlePaginate(tags.next_page_url)} className="rounded bg-gray-200 px-3 py-1">
                                            Next
                                        </button>
                                    )}
                                </div>

                                <div className="text-sm text-gray-600">
                                    Menampilkan data ke {tags.from} sampai {tags.to} dari total {tags.total} data. Halaman {tags.current_page} dari{' '}
                                    {tags.last_page}.
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
