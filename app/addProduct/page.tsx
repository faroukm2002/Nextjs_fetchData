
"use client";

// ********* POST *************

import { useState } from "react";
import { useRouter } from "next/navigation";
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price } = formData;

    if (!name || !description || !price) {
      return alert("All fields are required.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({ name: "", description: "", price: "" });
        router.push("/products");
      } else {
        const { message } = await response.json();
        alert(`Error: ${message}`);
      }
    } catch (error) {
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl transform hover:scale-105 transition-all">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-700"
            >
              Product Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product description"
              required
            />
          </div>

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
              value={formData.price}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product price"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
