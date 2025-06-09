import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://auction-platform-ett9.onrender.com/api/seller/products", {
          withCredentials: true,
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to fetch inventory. Please ensure you're logged in as a seller.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Inventory</h2>

      {loading ? (
        <p className="text-gray-600">Loading inventory...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found in inventory.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {product.image ? (
                <img
                  src={`https://auction-platform-ett9.onrender.com${product.image}`}
                  alt={product.title}
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 mb-3 rounded-md flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-1">₹{product.price}</p>
              <p className="text-gray-700 text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;

