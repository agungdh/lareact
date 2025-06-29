// src/pages/tag/Index.tsx
import { Button } from '@/components/ui/button';
import DataTable, { Column, Pagination } from '@/components/ui/data-table';
import { DynamicConfirmDialog } from '@/components/ui/dynamic-conrifm-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Tag {
    id: number;
    slug: string;
    tag: string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tag', href: '/tag' }];

export default function Index() {
    const { tags, filters } = usePage().props as {
        tags: Pagination & { data: Tag[] };
        filters: Record<string, any>;
    };

    // Callback untuk cari
    const handleSearch = (search: string) => {
        router.get('/tag', { search, per_page: filters.per_page }, { preserveState: true, replace: true });
    };

    // Callback untuk ubah jumlah per halaman
    const handlePerPageChange = (perPage: number) => {
        router.get('/tag', { search: filters.search, per_page: perPage }, { preserveState: true, replace: true });
    };

    // Callback untuk pagination
    const handlePageChange = (url: string) => {
        router.get(url, { search: filters.search, per_page: filters.per_page }, { preserveState: true, replace: true });
    };

    // Callback untuk sorting
    const handleSort = (column: string) => {
        const isSame = filters.order_by === column;
        const newDir = isSame && filters.order_dir === 'asc' ? 'desc' : 'asc';
        router.get(
            route('tag.index'),
            { page: 1, per_page: filters.per_page, search: filters.search, order_by: column, order_dir: newDir },
            { preserveScroll: true, replace: true },
        );
    };

    // Definisi kolom
    const columns: Column<Tag>[] = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'slug', label: 'Slug', sortable: true },
        { key: 'tag', label: 'Tag', sortable: true },
        {
            key: 'actions',
            label: 'Action',
            render: (tag) => (
                <>
                    <Link href={`/tag/${tag.id}/edit`}>
                        <button type="button" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            Ubah Data
                        </button>
                    </Link>
                    <DynamicConfirmDialog
                        trigger={<Button variant="destructive">Hapus Data</Button>}
                        title="Hapus Data"
                        description="Data yang sudah dihapus tidak bisa dikembalikan. Lanjutkan?"
                        confirmLabel="Ya, Hapus"
                        cancelLabel="Batal"
                        onConfirm={() =>
                            router.delete(`/tag/${tag.id}`, {
                                preserveScroll: true,
                                preserveState: true,
                                data: {
                                    search: filters.search,
                                    per_page: filters.per_page,
                                    order_by: filters.order_by,
                                    order_dir: filters.order_dir,
                                    page: filters.page,
                                },
                            })
                        }
                    />
                </>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Tag" />
            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <DataTable<Tag>
                        columns={columns}
                        data={tags.data}
                        pagination={tags}
                        filters={filters}
                        addNewButton={{ href: '/tag/create', label: '+ Tambah Tag' }}
                        onSearch={handleSearch}
                        onPerPageChange={handlePerPageChange}
                        onPageChange={handlePageChange}
                        onSort={handleSort}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
