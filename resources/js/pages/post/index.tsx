import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post',
    },
];

export default function Index({ posts }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />
            <a href="/post/create">Tambah</a>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Categories</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.id}</TableCell>
                            <TableCell>{post.slug}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>  {post.tags?.map(t => t.tag).join(', ')}</TableCell>
                            <TableCell> {post.categories?.map(c => c.category).join(', ')}</TableCell>
                            <TableCell>
                                <a href={`/post/${post.id}`}>
                                    <button>Preview</button>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
