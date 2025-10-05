import { useEffect } from "react";
import ProductCarousel from "./components/ProductCarousel";

function App() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${process.env.REACT_APP_API_URL}/v1/product/list`)
        .then((res) => console.log("Backend ping OK:", res.status))
        .catch((err) => console.error("Backend ping error:", err));
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProductCarousel />
    </div>
  );
}

export default App;