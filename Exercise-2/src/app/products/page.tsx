type Product = {
  id: number;
  title: string;
};

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products: Product[] = data.products.slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Products</h1>
      <ul className="mt-4 list-disc pl-5">
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
