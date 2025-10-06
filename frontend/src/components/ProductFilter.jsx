import { useState } from "react";
import "./ProductFilter.css";

export default function ProductFilter({ onFilter }) {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minPopularity, setMinPopularity] = useState("");
    const [maxPopularity, setMaxPopularity] = useState("");

    const handleFilter = () => {
        onFilter({
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            minPopularity: minPopularity || null,
            maxPopularity: maxPopularity || null,
        });
    };

    return (
        <div className="product-filter-container">
            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Min Popularity"
                value={minPopularity}
                onChange={(e) => setMinPopularity(e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Popularity"
                value={maxPopularity}
                onChange={(e) => setMaxPopularity(e.target.value)}
            />
            <button onClick={handleFilter}>Apply Filter</button>
        </div>
    );
}
