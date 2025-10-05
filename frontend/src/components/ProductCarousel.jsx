import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ProductCarousel.css";
import StarRating from "./StarRating";

const colorLabels = {
    yellow: {
        label: "Yellow Gold",
        colorCode: "#E6CA97"
    },
    rose: {
        label: "Rose Gold",
        colorCode: "#E1A4A9"
    },
    white: {
        label: "White Gold",
        colorCode: "#D9D9D9"
    }
};

export default function ProductCarousel() {
    const [products, setProducts] = useState([]);
    const [selectedColors, setSelectedColors] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/product/list`);
            if (!response.ok) {
                throw new Error("API request failed");
            }
            const data = await response.json();

            setProducts(data);


            const colorSelections = {};
            data.forEach(product => {
                colorSelections[product.id] = "yellow";
            });
            setSelectedColors(colorSelections);
        } catch (error) {
            console.error(error);
        }
    };

    const handleColorChange = (productId, color) => {
        setSelectedColors({
            ...selectedColors,
            [productId]: color
        });
    };

    const formatPrice = (price) => {
        return `$${price.toFixed(2)} USD`;
    };

    const formatPopularity = (popularityScore) => {
        const scoreOutOf5 = (popularityScore * 5).toFixed(1);
        return `${scoreOutOf5}/5`;
    };

    return (
        <div className="product-carousel-container">
            <h2 className="product-list-title">Product List</h2>
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 }
                }}
            >
                {products.map(product => {
                    const selectedColor = selectedColors[product.id] || "yellow";
                    const colorInfo = colorLabels[selectedColor];

                    return (
                        <SwiperSlide key={product.id}>
                            <div className="product-card">
                                <img
                                    src={product.images[selectedColor]}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-price">{formatPrice(product.price)}</p>
                                <p
                                    className="product-color-label"
                                    style={{ color: colorInfo.colorCode }}
                                >
                                    {colorInfo.label}
                                </p>

                                <div className="color-picker">
                                    {Object.keys(colorLabels).map(color => (
                                        <button
                                            key={color}
                                            className={`color-button ${selectedColor === color ? "selected" : ""
                                                }`}
                                            style={{
                                                backgroundColor: colorLabels[color].colorCode
                                            }}
                                            onClick={() => handleColorChange(product.id, color)}
                                        />
                                    ))}
                                </div>

                                <p className="popularity">
                                    Popularity: <StarRating score={product.popularityScore * 5} />
                                </p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
