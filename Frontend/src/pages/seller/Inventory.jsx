import { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/seller/products", { withCredentials: true }).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      {products.length === 0 ? (
        <p>No products in inventory.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <li key={product._id} className="p-4 bg-gray-800 rounded border border-gray-700">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
              {product.image && (
                <img
                  src={`https://your-backend-url.com${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover mt-2"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;
