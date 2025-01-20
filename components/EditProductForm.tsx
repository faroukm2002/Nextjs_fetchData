"use client";

// ********* PUT *******************

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditProductForm = () => {
  const { id: productId } = useParams();
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/product/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
          });
        } else {
          setError("Failed to fetch product details.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("An error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [API_BASE_URL, productId]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        router.push("/products");
      } else {
        setError("Failed to update product.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while updating the product.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl transform hover:scale-105 transition-all">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Product Price Field */}
          <div>
            <label
              htmlFor="price"
              className="block text-lg font-semibold text-gray-700"
            >
              Product Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
