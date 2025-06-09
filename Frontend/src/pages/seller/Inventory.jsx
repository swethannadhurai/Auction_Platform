import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await axios.get("/api/seller/products", {
          withCredentials: true,
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading inventory...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-gray-600">No products found in inventory.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md p-4">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
