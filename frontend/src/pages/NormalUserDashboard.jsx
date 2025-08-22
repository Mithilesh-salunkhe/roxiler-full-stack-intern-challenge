import React, { useState, useEffect } from "react";
import axios from "axios";
import RatingForm from "../components/RatingForm";
import storeImage from "../assets/store.svg";

export const NormalUserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [ratings, setRatings] = useState({}); // State to hold ratings data
    
    // Get user ID from local storage for fetching their specific rating
    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {
        const fetchStoresAndRatings = async () => {
            const token = localStorage.getItem('token');
            const isLoggedIn = !!token;

            try {
                // Fetch stores from the public route
                const storesResponse = await axios.get(`http://localhost:5000/stores?name=${search}&address=${search}`);
                setStores(storesResponse.data.stores);

                if (isLoggedIn) {
                    // If the user is logged in, fetch all ratings
                    const ratingsPromises = storesResponse.data.stores.map(store =>
                        axios.get(`http://localhost:5000/ratings/store/${store._id}/ratings`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                    );
                    const ratingsResponses = await Promise.all(ratingsPromises);
                    
                    const newRatings = ratingsResponses.reduce((acc, res, index) => {
                        const storeId = storesResponse.data.stores[index]._id;
                        acc[storeId] = res.data;
                        return acc;
                    }, {});
                    setRatings(newRatings);
                }

            } catch (err) {
                setError('Failed to fetch store or rating data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStoresAndRatings();
    }, [search]); // Re-run effect when the search term changes

    if (loading) return <div className="text-center mt-12 text-xl font-semibold text-blue-600 animate-pulse">Loading stores...</div>;
    if (error) return <div className="text-center mt-12 text-xl font-semibold text-red-500">{error}</div>;
    if (!stores || stores.length === 0) return <div className="text-center mt-12 text-lg text-gray-700">No stores available.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                    Explore Stores & Rate Them
                </h1>
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Search for a store..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-3 rounded-xl shadow-md border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {stores.length > 0 ? (
                        stores.map((store) => {
                            const storeRatings = ratings[store._id] || {};
                            return (
                                <div
                                    key={store._id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-6 flex flex-col justify-between"
                                >
                                    <img
                                        src={storeImage}
                                        alt="Store"
                                        className="w-32 h-32 object-contain mx-auto mt-4"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                            {store.name}
                                        </h2>
                                        <p className="text-gray-600 mb-4">{store.address}</p>
                                        <div className="flex items-center mb-4 text-lg">
                                            <p className="font-semibold text-gray-700 mr-2">Overall Rating:</p>
                                            <p className="text-purple-600 font-bold">
                                                {storeRatings.overallRating ? storeRatings.overallRating.toFixed(1) : 'N/A'}
                                            </p>
                                        </div>
                                        {userId && (
                                            <div className="flex items-center mb-4 text-lg">
                                                <p className="font-semibold text-gray-700 mr-2">Your Rating:</p>
                                                <p className="text-indigo-600 font-bold">
                                                    {storeRatings.userSubmittedRating || 'N/A'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-auto">
                                        <div className="border rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300 flex flex-col items-center space-y-3">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Rate this store
                                            </h3>
                                            <RatingForm 
                                                storeId={store._id} 
                                                initialRating={storeRatings.userSubmittedRating}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center col-span-full text-gray-600">
                            No stores match your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NormalUserDashboard;