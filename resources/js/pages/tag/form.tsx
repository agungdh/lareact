import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

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

            <div className="px-4 py-6">
                <div className="md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <div className="space-y-6">
                            <HeadingSmall title="Create Tag"/>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>

                                    <Input
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        // required
                                        placeholder="Slug"
                                    />

                                    <InputError className="mt-2" message={errors.slug} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tag">Email address</Label>

                                    <Input
                                        id="tag"
                                        className="mt-1 block w-full"
                                        value={data.tag}
                                        onChange={(e) => setData('tag', e.target.value)}
                                        // required
                                        placeholder="Tag"
                                    />

                                    <InputError className="mt-2" message={errors.tag} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Save</Button>

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
