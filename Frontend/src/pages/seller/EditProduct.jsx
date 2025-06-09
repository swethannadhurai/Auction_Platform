
import { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = () => {
  const productId = "some-product-id"; // Replace with dynamic logic
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    axios.get(`https://auction-platform-ett9.onrender.com/api/seller/products/${productId}`, { withCredentials: true }).then((res) => {
      setFormData(res.data);
    });
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://auction-platform-ett9.onrender.com/api/seller/products/${productId}`, formData, { withCredentials: true });
      alert("Product updated!");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2" />
        <input name="price" value={formData.price} onChange={handleChange} type="number" className="w-full p-2" />
        <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
