import { useCategories } from '@/hooks/useCategories.jsx'; 
import Layout from '@/components/private/Layout.jsx'; 

export default function Index() { 
    const { categories, getCategories } = useCategories(); 
    console.log(categories); 

    return (
        <Layout>
            <div>Index</div>
        </Layout>
    )
}
