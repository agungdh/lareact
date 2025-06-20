import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post',
    },
];

export default function Index() {
    const [values, setValues] = useState({
        slug: "",
        title: "",
        content: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/users', values)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="slug">Slug</Label>
                    <Input type="text" id="slug" placeholder="Slug" value={values.slug} onChange={handleChange} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" placeholder="Title" value={values.title} onChange={handleChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </AppLayout>
    );
}
