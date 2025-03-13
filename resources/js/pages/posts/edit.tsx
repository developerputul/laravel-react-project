import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';

import { Head, router, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts Update',
        href: '/posts',
    },
];

export default function PostEdit({ currentPost }: { currentPost: Post }) {
    const [title, setTitle] = useState<string>('currentPost.title');
    const [content, setContent] = useState<string>('currentPost.content');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { errors } = usePage().props;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('posts.update', currentPost.id), {
            _method: 'put',
            title,
            content,
            image,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts Update" />
            <section className="mx-auto max-w-md rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" type="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="First Post" />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" onChange={handleFileChange} />
                            <img src={currentPost.image} alt={currentPost.title} className="h-10 w-10 rounded-full object-cover" />

                            {imagePreview && <img className="h-10 w-10 rounded-full object-cover" src={imagePreview} alt="Preview" />}
                            <InputError message={errors.image} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                            <InputError message={errors.content} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Update
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    );
}
