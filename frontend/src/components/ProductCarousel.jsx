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

export default function ProductCarousel({ products }) {
    const [selectedColors, setSelectedColors] = useState({});

    useEffect(() => {
        const colorSelections = {};
        products.forEach(product => {
            colorSelections[product.id] = "yellow";
        });
        setSelectedColors(colorSelections);
    }, [products]);

    const handleColorChange = (productId, color) => {
        setSelectedColors({
            ...selectedColors,
            [productId]: color
        });
    };

    const formatPrice = (price) => `$${price.toFixed(2)} USD`;

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
                                <p className="product-color-label">{colorInfo.label}</p>

                                <div className="color-picker">
                                    {Object.keys(colorLabels).map(color => (
                                        <button
                                            key={color}
                                            className={`color-button ${selectedColor === color ? "selected" : ""}`}
                                            style={{ backgroundColor: colorLabels[color].colorCode }}
                                            onClick={() => handleColorChange(product.id, color)}
                                        />
                                    ))}
                                </div>

                                <div className="popularity">
                                    <StarRating score={product.popularityScore * 5} />
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
