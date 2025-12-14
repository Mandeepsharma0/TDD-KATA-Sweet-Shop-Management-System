import Sweet from "../models/Sweet.model.js";

// ➕ Add Sweet (Admin)
export const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch {
    res.status(500).json({ message: "Failed to add sweet" });
  }
};

// 📃 Get Sweets + Search + Filter
export const getAllSweets = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
};

// 🛒 BUY SWEET
export const buySweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: "Purchased", sweet });
  } catch {
    res.status(500).json({ message: "Purchase failed" });
  }
};

// ✏️ Update Sweet
export const updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sweet);
};

// 🗑 Delete Sweet
export const deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};
