import ProductListCard from '@/components/product-list-card';
import axios from 'axios';

export default function CategoryProducts({ data }) {
  const { Products } = data;
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-screen-xl">
        <div className="my-6">
          <h1 className="text-3xl font-bold">Category - {data.Name}</h1>
        </div>
        <div>
          {Products.length > 0 ? (
            Products.map((product) => <ProductListCard key={product.Id} product={product} />)
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold">No Products Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const categoryType = query.type;
  const response = await axios.get(`http://localhost:44355/api/categories/${categoryType}/products`);
  const data = await response.data;
  return { props: { data } };
}
