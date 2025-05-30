import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAuctionItem = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startingBid, setStartingBid] = useState("");
	const [endDate, setEndDate] = useState("");
	const [image, setImage] = useState(null); 
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("jwt="))
			?.split("=")[1];

		if (token) {
			try {
				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("startingBid", startingBid);
				formData.append("endDate", endDate);
				if (image) {
					formData.append("image", image);
				}

				await axios.post(`${import.meta.env.VITE_API_URL}/api/auctions`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				});
				navigate("/profile");
			} catch (err) {
				setError("Failed to create auction. Please try again.");
				console.error(err);
			}
		}
	};

	return (
		<div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
			<div className="max-w-2xl mx-auto">
				<div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
					<div className="p-6 sm:p-10">
						<h2 className="text-3xl font-extrabold text-white mb-6">
							Create Auction
						</h2>
						{error && <p className="text-red-500 mb-4">{error}</p>}
						<form onSubmit={handleSubmit} encType="multipart/form-data">
							<div className="mb-4">
								<label
									htmlFor="title"
									className="block text-lg font-medium text-gray-300 mb-1"
								>
									Title
								</label>
								<input
									id="title"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-lg font-medium text-gray-300 mb-1"
								>
									Description
								</label>
								<textarea
									id="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="startingBid"
									className="block text-lg font-medium text-gray-300 mb-1"
								>
									Starting Bid ($)
								</label>
								<input
									id="startingBid"
									type="number"
									value={startingBid}
									onChange={(e) => setStartingBid(e.target.value)}
									className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
									min={0}
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="endDate"
									className="block text-lg font-medium text-gray-300 mb-1"
								>
									End Date
								</label>
								<input
									id="endDate"
									type="datetime-local"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
									required
								/>
							</div>
							<div className="mb-6">
								<label
									htmlFor="image"
									className="block text-lg font-medium text-gray-300 mb-1"
								>
									Image Upload
								</label>
								<input
									id="image"
									type="file"
									accept="image/*"
									onChange={(e) => setImage(e.target.files[0])}
									className="w-full text-gray-300"
									required
								/>
							</div>
							<button
								type="submit"
								className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
							>
								Create Auction
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateAuctionItem;
