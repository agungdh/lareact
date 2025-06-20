import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Image',
        href: '/image',
    },
];

export default function Index() {
    const { data, setData, post, progress } = useForm({
        image: null,
        description: null,
    });

    function submit(e) {
        e.preventDefault();
        post('/image');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <form onSubmit={submit}>
                <input type="text" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                <input type="file" onChange={(e) => setData('image', e.target.files[0])} />
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <button type="submit">Submit</button>
            </form>
        </AppLayout>
    );
}
