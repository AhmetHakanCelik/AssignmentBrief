import React from "react";

function Star({ fillPercentage = 100, size = 20 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "2px" }}
        >
            <defs>
                <linearGradient id={`grad-${fillPercentage}`}>
                    <stop offset={`${fillPercentage}%`} stopColor="#E6CA97" />
                    <stop offset={`${fillPercentage}%`} stopColor="#ccc" />
                </linearGradient>
            </defs>
            <path
                fill={`url(#grad-${fillPercentage})`}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24
         l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
        </svg>
    );
}

export default function StarRating({ score }) {
    const maxStars = 5;
    const fullStars = Math.floor(score);
    const fraction = score - fullStars;
    const hasHalfStar = fraction > 0 && fraction < 1;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} fillPercentage={100} />);
    }

    // Half star
    if (hasHalfStar) {
        stars.push(<Star key="half" fillPercentage={fraction * 100} />);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} fillPercentage={0} />);
    }

    return (
        <div style={{ display: "inline-flex", alignItems: "center" }}>
            {stars}
            <span
                style={{
                    marginLeft: "6px",
                    fontSize: "16px",
                    color: "#555",
                    fontWeight: "600",
                    userSelect: "none",
                }}
            >
                {score.toFixed(1)} / {maxStars}
            </span>
        </div>
    );
}
