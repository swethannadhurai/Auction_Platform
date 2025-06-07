// /pages/seller/Inventory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/seller/products", { withCredentials: true });
        // Set products or fallback to empty array
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-white p-4">Loading products...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (products.length === 0) return <div className="text-white p-4">No products found.</div>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl mb-4">Your Inventory</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="border p-4 rounded bg-gray-800">
            <h3 className="font-semibold">{product.title}</h3>
            <p>{product.description}</p>
            {/* Add buttons or links for Edit/Delete as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;

