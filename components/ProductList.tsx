"use client";
//  *********   Get **************
//  *********   DELETE **************

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const ProductList = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        if (Array.isArray(data.Products)) {
          setProducts(data.Products);
        } else {
          throw new Error("Received data is not an array");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchProducts();
  }, [API_BASE_URL]);

  // Handle product deletion
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the product"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Product List
      </h1>

      {/* Display error if any */}
      {error && <div className="text-red-400 text-center mb-4">{error}</div>}

      {/* Link to Add Product page */}
      <Link
        href="/addProduct"
        className="inline-block mb-6 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
      >
        Add Product
      </Link>

      <ul className="space-y-6">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-500 mt-2">{product.description}</p>
                <p className="text-xl font-bold text-gray-700 mt-2">
                  {product.price != null
                    ? `$${product.price.toFixed(2)}`
                    : "Price not available"}
                </p>
              </div>
              <div className="space-x-4 flex">
                <button
                  onClick={() => router.push(`/editProduct/${product._id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
