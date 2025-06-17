import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post',
    },
];

interface Post {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    posts: Post[];
}

export default function Index() {
    const { posts, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}`)) {
            destroy(route('products.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href={route('post.create')}>
                    <Button>Create a Product</Button>
                </Link>
            </div>
            <div className="m-4">
                <div>
                    {flash.message && (
                        <Alert>
                            <Megaphone className="h-4 w-4" />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {posts.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow>
                                    <TableCell className="font-medium">{post.id}</TableCell>
                                    <TableCell>{post.name}</TableCell>
                                    <TableCell>{post.price}</TableCell>
                                    <TableCell>{post.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link href={route('post.edit', product.id)}>
                                            <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="bg-red-500 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
