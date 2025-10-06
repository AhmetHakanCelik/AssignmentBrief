export const fetchProducts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}` / v1 / product / list);
    if (!response.ok) {
        throw new Error("API request failed");
    }
    return await response.json();
};
