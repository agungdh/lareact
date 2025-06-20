import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

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
                <Input type="text" placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="file">File</Label>
                    <Input id="file" type="file" onChange={(e) => setData('image', e.target.files[0])} />
                </div>
                {progress && (
                    <Progress value={progress.percentage} className="w-[60%]" />
                )}
                <button type="submit">Submit</button>
            </form>
        </AppLayout>
    );
}
