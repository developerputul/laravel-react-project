import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface Post {
    id: number;
    title: string;
    content: string;
    image: string;
}

export default function PostIndex({ posts }: { posts: Post[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('posts.create')} className="text-indigo-500 underline">
                        Create Post
                    </Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your Post</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Thumbnail</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow>
                                    <TableCell className="font-medium">{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>
                                        <img className="h-10 w-10 rounded-md object-cover" src={post.image} alt={post.title} />
                                    </TableCell>
                                    <TableCell className="text-right">Edit/Delete</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
