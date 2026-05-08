import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new product',
        href: '/Products/Create',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new product" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/*Display error*/}

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <InfoIcon/>
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor='product name'>Name</Label>
                        <Input placeholder='Product Name' value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor='product price'>Price</Label>
                        <Input placeholder='Price' value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor='product description'>Description</Label>
                        <Textarea placeholder='Description' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <Button disabled={processing} type='submit'>Add product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
