import { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      const response = await axios.post(
        "/api/seller/products",
        data,
        { withCredentials: true }
      );
      alert("Product created!");
    } catch (error) {
      console.error("Create failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full p-2" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2" required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full p-2" required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 px-4 py-2 text-white rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
