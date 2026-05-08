import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/Products',
    },
];

interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
}

interface PageProps {
    flash: {
        message?: string
    },
    products: Product[],
    search?: string
}

export default function Index() {

    const { products, flash, search } = usePage().props as unknown as PageProps;

    const { processing, delete: destroy, data, setData, get } = useForm({
        search: search ?? ''
    });

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete ${id}. ${name}?`)) {
            destroy(route("products.destroy", id));
        }
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        get(route('products.index'), {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <Link href={route('products.create')}><Button>Create a product</Button></Link>
                <form onSubmit={handleSearch} className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                    <input
                        type='search'
                        name='search'
                        placeholder='Search products by name or description'
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        className='rounded border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500'
                    />
                    <Button type='submit' disabled={processing}>Search</Button>
                    {data.search && (
                        <Link href={route('products.index')} className='inline-flex'>
                            <Button type='button' className='bg-slate-500 hover:bg-slate-700'>Clear</Button>
                        </Link>
                    )}
                </form>
            </div>
            <div>
                {flash.message && (
                    <Alert>
                        <InfoIcon />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            {products.length > 0 ? (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                            <TableRow>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="text-center space-x-2">
                                    <Link href={route('products.edit', product.id)}><Button className='bg-slate-500 hover:bg-slate-700'>Edit</Button></Link>
                                    <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} className='bg-red-500 hover:bg-red-700'>Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className='m-4 rounded border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700'>
                    {search ? (
                        <p>No products matched "{search}".</p>
                    ) : (
                        <p>No products found. Add one using the Create button.</p>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
