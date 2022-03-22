import React, { useState, useEffect } from "react";

const Panier = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        cart = localStorage.getItem("products");
    }, [cart])
    return(
        <div>
            { {
            }}
        </div>
    )
}

export default Panier;