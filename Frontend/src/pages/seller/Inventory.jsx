import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          "https://auction-platform-ett9.onrender.com/api/seller/inventory",
          { withCredentials: true }
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch inventory");
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `https://auction-platform-ett9.onrender.com/api/seller/products/${id}`,
        { withCredentials: true }
      );
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📦 Your Inventory</h2>

      {loading ? (
        <p className="text-gray-600">Loading inventory...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              {product.image && (
                <img
                  src={`https://auction-platform-ett9.onrender.com${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {product.category || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Quantity:</span> {product.quantity ?? "N/A"}
              </p>
              <p className="text-sm text-gray-700 font-semibold mt-2">₹{product.price}</p>

              <div className="mt-4 flex gap-3">
                <Link
                  to={`/seller-dashboard/edit-product/${product._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;
