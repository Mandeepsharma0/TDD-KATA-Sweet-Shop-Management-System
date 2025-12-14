import { useEffect, useState } from "react";
import API from "../api/axios";
import SweetCard from "../components/SweetCard";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchSweets = async () => {
    const res = await API.get(
      `/sweets?search=${search}&category=${category}`
    );
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🍭 Sweet Shop Dashboard
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <input
          className="px-4 py-2 rounded-lg border"
          placeholder="Search sweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-lg border"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Indian Sweet</option>
          <option>UK Sweet</option>
          <option>Turkish Sweet</option>
          <option>Japanese Sweet</option>
        </select>

        <button
          onClick={fetchSweets}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Apply
        </button>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            refresh={fetchSweets}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
