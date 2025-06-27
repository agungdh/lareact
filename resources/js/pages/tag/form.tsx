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
        title: 'Tag',
        href: '/tag',
    },
];

export default function Form({ tag }: { tag?: Tag }) {
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        slug: tag?.slug || '',
        tag: tag?.tag || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (tag) {
            // Jika tag sudah ada, kirim request untuk update
            put(`/tag/${tag.id}`, {
                method: 'put',
                preserveScroll: true,
            });
        } else {
            // Jika tag baru, kirim request untuk store
            post('/tag', {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={tag ? 'Edit Tag' : 'Create Tag'} />

            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <section className="w-full space-y-12">
                        <div className="space-y-6">
                            <HeadingSmall title={tag ? 'Edit Tag' : 'Create Tag'} />

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
                                    <Label htmlFor="tag">Tag</Label>

                                    <Input
                                        id="tag"
                                        className="mt-1 block w-full"
                                        value={data.tag}
                                        onChange={(e) => setData('tag', e.target.value)}
                                        placeholder="Tag"
                                    />

                                    <InputError className="mt-2" message={errors.tag} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link href="/tag">
                                        <Button type="button" variant="outline">
                                            Kembali
                                        </Button>
                                    </Link>

                                    <Button type="submit" disabled={processing}>
                                        {tag ? 'Update' : 'Simpan'}
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
