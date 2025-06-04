import { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://auction-platform-ett9.onrender.com/api/seller/products`,
        form,
        { withCredentials: true }
      );
      setMessage('Product created successfully!');
      setForm({ name: '', price: '', quantity: '', category: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error creating product.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Product</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full p-2 border" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" className="w-full p-2 border" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;