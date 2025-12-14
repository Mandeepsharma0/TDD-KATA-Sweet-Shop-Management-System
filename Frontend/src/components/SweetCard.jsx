import API from "../api/axios";

const imageMap = {
  "Kaju Katli":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1170&auto=format&fit=crop",
  "Ladoo":
    "https://images.unsplash.com/photo-1608032077018-c9aad9565d29?q=80&w=1170&auto=format&fit=crop",
  "Rasgulla":
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1170&auto=format&fit=crop",
  "Gulab Jamun":
    "https://images.unsplash.com/photo-1590080877777-4e8e5a7a8b58?q=80&w=1170&auto=format&fit=crop",
  "Jalebi":
    "https://images.unsplash.com/photo-1617191517008-2bbf8c4f0d09?q=80&w=1170&auto=format&fit=crop",
  "Baklava":
    "https://images.unsplash.com/photo-1604908177522-040e7cfe7e6c?q=80&w=1170&auto=format&fit=crop",
  "Mochi":
    "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1170&auto=format&fit=crop",
  "Cheesecake Slice":
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1170&auto=format&fit=crop",
    "Indian Sweet":
    "https://plus.unsplash.com/premium_photo-1698500035173-fdea60f9294e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "UK Sweet":
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Turkish Sweet":
    "https://images.unsplash.com/photo-1514424350208-755887f7b374?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Japanese Sweet":
    "https://plus.unsplash.com/premium_photo-1700830647889-3203536bb690?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Default":
    "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1170&auto=format&fit=crop";

const SweetCard = ({ sweet, refresh }) => {
  const handleBuy = async () => {
    const confirmBuy = window.confirm(
      `Buy "${sweet.name}" for ₹${sweet.price}?`
    );

    if (!confirmBuy) return;

    try {
      await API.post(`/sweets/${sweet._id}/buy`);
      alert("🎉 Sweet purchased successfully!");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Out of stock");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition w-full sm:w-[260px] overflow-hidden">
      {/* Image */}
      <img
        src={imageMap[sweet.name] || fallbackImage}
        alt={sweet.name}
        className="h-44 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg">{sweet.name}</h3>
        <p className="text-sm text-gray-500">{sweet.category}</p>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-purple-700 text-lg">
            ₹{sweet.price}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              sweet.quantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            Stock: {sweet.quantity}
          </span>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleBuy}
          disabled={sweet.quantity === 0}
          className={`w-full mt-3 py-2 rounded-lg font-semibold transition ${
            sweet.quantity === 0
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Buy Now"}
        </button>
      </div>
    </div>
  );
};

export default SweetCard;
