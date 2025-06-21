import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post',
    },
];

export default function Index() {
    const [values, setValues] = useState({
        tags: '',
        categories: '',
        slug: '',
        title: '',
        post_content: '',
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post('/post', values);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="categories">Categories</Label>
                    <Input type="text" id="categories" placeholder="Categories" value={values.categories} onChange={handleChange} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="tags">Tags</Label>
                    <Input type="text" id="tags" placeholder="Tags" value={values.tags} onChange={handleChange} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="slug">Slug</Label>
                    <Input type="text" id="slug" placeholder="Slug" value={values.slug} onChange={handleChange} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" placeholder="Title" value={values.title} onChange={handleChange} />
                </div>
                <div className="container">
                    <MDEditor value={values.post_content} onChange={(value) => setValues((values) => ({ ...values, post_content: value || '' }))} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </AppLayout>
    );
}
