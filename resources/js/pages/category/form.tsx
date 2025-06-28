import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function Form({ category }: { category?: Category }) {
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        slug: category?.slug || '',
        category: category?.category || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (category) {
            // Jika category sudah ada, kirim request untuk update
            put(`/category/${category.id}`, {
                method: 'put',
                preserveScroll: true,
            });
        } else {
            // Jika category baru, kirim request untuk store
            post('/category', {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category ? 'Edit Category' : 'Create Category'} />

            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <section className="w-full space-y-12">
                        <div className="space-y-6">
                            <HeadingSmall title={category ? 'Edit Category' : 'Create Category'} />

                            <form onSubmit={submit} className="w-full space-y-6">
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="slug">Slug</Label>

                                    <Input
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="Slug"
                                    />

                                    <InputError className="mt-2" message={errors.slug} />
                                </div>

                                <div className="grid w-full gap-2">
                                    <Label htmlFor="category">Category</Label>

                                    <Input
                                        id="category"
                                        className="mt-1 block w-full"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Category"
                                    />

                                    <InputError className="mt-2" message={errors.category} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link href="/category">
                                        <Button type="button" variant="outline">
                                            Kembali
                                        </Button>
                                    </Link>

                                    <Button type="submit" disabled={processing}>
                                        {category ? 'Update' : 'Simpan'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
