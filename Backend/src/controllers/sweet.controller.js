import Sweet from "../models/Sweet.model.js";

// ➕ Add Sweet
export const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📃 Get All Sweets
export const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔍 Search Sweets
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update Sweet
export const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑 Delete Sweet
export const deleteSweet = async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: "Sweet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🛒 Purchase Sweet
export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📦 Restock Sweet
export const restockSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    sweet.quantity += 5; // default restock
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
