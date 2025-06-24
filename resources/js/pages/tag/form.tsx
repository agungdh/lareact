import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
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

export default function Form() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        slug: '',
        tag: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/tag', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tag" />

            <div className="flex justify-center px-4 py-6">
                <div className="w-3/4">
                    <section className="w-full space-y-12">
                        <div className="space-y-6">
                            <HeadingSmall title="Create Tag" />

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
                                    <Button type="submit" disabled={processing}>Save</Button>

                                    <a href="/tag">
                                        <Button type="button" variant="outline">Kembali</Button>
                                    </a>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition>
                                </div>

                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
