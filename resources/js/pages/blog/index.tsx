import { TableCell, TableRow } from '@/components/ui/table';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import BlogLayout from '@/layouts/blog-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index({ posts }) {
    console.log({posts})

    const category = (categories) => {
        return categories.map(item => item.category).join(', ')
    }

    const tag = (tags) => {
        return tags.map(item => item.tag).join(', ')
    }

    return (
        <BlogLayout>
            <Head title="Index" />
            {posts.data.map((post) => (
                <Card className="w-full" key={post.id}>
                    <CardHeader>
                        <a href={`/blog/${post.slug}`}><CardTitle>{post.title}</CardTitle></a>
                        <CardDescription>
                            {post.created_at} | {category(post.categories)} | {tag(post.tags)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {post.content}
                    </CardContent>
                </Card>
            ))}
        </BlogLayout>
    );
}
