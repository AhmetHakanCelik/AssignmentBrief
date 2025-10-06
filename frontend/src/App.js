import { useEffect, useState } from "react";
import ProductCarousel from "./components/ProductCarousel";
import ProductFilter from "./components/ProductFilter";

function App() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filterParams = {}) => {
    const query = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/v1/product/filter?${query.toString()}`
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${process.env.REACT_APP_API_URL}/v1/product/list`)
        .then((res) => console.log("Backend ping OK:", res.status))
        .catch((err) => console.error("Backend ping error:", err));
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProductFilter onFilter={setFilters} />
      <ProductCarousel products={products} />
    </div>
  );
}

export default App;


