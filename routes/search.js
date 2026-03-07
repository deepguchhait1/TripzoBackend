import express from "express";
import Destination from "../models/Destination.js";
import Package from "../models/Package.js";
const router = express.Router();

// GET /api/search?q=keyword — Global search across destinations & packages
router.get("/", async (req, res) => {
  try {
    const { q, type, minRating, minPrice, maxPrice, sort } = req.query;

    if (!q || !q.trim()) {
      return res.json({ destinations: [], packages: [] });
    }

    const regex = { $regex: q, $options: "i" };

    // Build common filters
    const priceFilter = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);

    const ratingFilter = minRating ? { $gte: Number(minRating) } : undefined;

    // Destination search
    let destinations = [];
    if (!type || type === "all" || type === "destinations") {
      const destFilter = {
        active: true,
        $or: [
          { name: regex },
          { state: regex },
          { description: regex },
          { category: regex },
          { duration: regex },
        ],
      };
      if (Object.keys(priceFilter).length) destFilter.price = priceFilter;
      if (ratingFilter) destFilter.rating = ratingFilter;

      let destQuery = Destination.find(destFilter);
      if (sort === "price-low") destQuery = destQuery.sort({ price: 1 });
      else if (sort === "price-high") destQuery = destQuery.sort({ price: -1 });
      else if (sort === "rating") destQuery = destQuery.sort({ rating: -1 });
      else destQuery = destQuery.sort({ rating: -1, reviews: -1 });

      destinations = await destQuery.limit(20);
    }

    // Package search
    let packages = [];
    if (!type || type === "all" || type === "packages") {
      const pkgFilter = {
        active: true,
        $or: [
          { title: regex },
          { category: regex },
          { destinations: { $elemMatch: { $regex: q, $options: "i" } } },
          { highlights: { $elemMatch: { $regex: q, $options: "i" } } },
          { duration: regex },
        ],
      };
      if (Object.keys(priceFilter).length) pkgFilter.price = priceFilter;
      if (ratingFilter) pkgFilter.rating = ratingFilter;

      let pkgQuery = Package.find(pkgFilter);
      if (sort === "price-low") pkgQuery = pkgQuery.sort({ price: 1 });
      else if (sort === "price-high") pkgQuery = pkgQuery.sort({ price: -1 });
      else if (sort === "rating") pkgQuery = pkgQuery.sort({ rating: -1 });
      else pkgQuery = pkgQuery.sort({ rating: -1, reviews: -1 });

      packages = await pkgQuery.limit(20);
    }

    res.json({
      destinations,
      packages,
      total: destinations.length + packages.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/search/suggestions?q=keyword — Lightweight autocomplete suggestions
router.get("/suggestions", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json({ suggestions: [] });
    }

    const regex = { $regex: q, $options: "i" };

    // Fetch limited fields for speed
    const [destinations, packages] = await Promise.all([
      Destination.find(
        { active: true, $or: [{ name: regex }, { state: regex }, { category: regex }] },
        { name: 1, state: 1, category: 1, image: 1, rating: 1, price: 1 }
      ).limit(5).lean(),
      Package.find(
        { active: true, $or: [{ title: regex }, { category: regex }, { destinations: { $elemMatch: { $regex: q, $options: "i" } } }] },
        { title: 1, category: 1, image: 1, rating: 1, price: 1, duration: 1 }
      ).limit(5).lean(),
    ]);

    const suggestions = [
      ...destinations.map((d) => ({
        _id: d._id,
        type: "destination",
        title: d.name,
        subtitle: d.state,
        category: d.category,
        image: d.image,
        rating: d.rating,
        price: d.price,
      })),
      ...packages.map((p) => ({
        _id: p._id,
        type: "package",
        title: p.title,
        subtitle: p.duration,
        category: p.category,
        image: p.image,
        rating: p.rating,
        price: p.price,
      })),
    ];

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
