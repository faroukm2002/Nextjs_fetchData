
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Our E-Commerce Site
        </h1>
        <p className="text-xl mb-6">
          Here you can find a variety of products, browse through the catalog,
          or add your own products!
        </p>

        <div className="space-x-4">
          {/* Link to Product List */}
          <Link href="/products">
            <div className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all transform hover:scale-105">
              View Products
            </div>
          </Link>

          {/* Link to Add Product Page */}
          <Link href="/addProduct">
            <div className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all transform hover:scale-105">
              Add Product
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
