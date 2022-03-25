import React, { useState, useEffect } from "react";
import './panier.css';
const Panier = () => {
    const [cart, setCart] = useState(localStorage.getItem("products"));
    const [cartTotal, setCartTotal] = useState(0);

    function getCartItems() {
        const data = localStorage.getItem("products");
        if(!data) return [];
        return JSON.parse(data);
    }

    function price() {
        setCartTotal(getCartItems().reduce((sum, item) => sum + item.prix, 0));
    }

    useEffect(() => {
        getCartItems();
        price();
    }, [cart])
    return(
        <div className="cart_section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="cart_container">
                            <div className="cart_title">Shopping Cart<small> ( {getCartItems().length} item in your cart) </small></div>
                            {cart ? getCartItems().map(product => {
                                return <div className="cart_items">
                                    <ul className="cart_list">
                                        <li className="cart_item clearfix">
                                            <div className="cart_item_image"><img src={"http://localhost:8081/images/" + product.image} alt="" /></div>
                                            <div
                                                className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                                <div className="cart_item_name cart_info_col">
                                                    <div className="cart_item_title">{product.typeObjet}</div>
                                                    <div className="cart_item_text">{product.nomObjet}</div>
                                                </div>
                                                <div className="cart_item_price cart_info_col">
                                                    <div className="cart_item_title">Price</div>
                                                    <div className="cart_item_text">{product.prix}$</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            }) :
                                <div>
                                </div>}
                            <div className="order_total">
                                <div className="order_total_content text-md-right">
                                    <div className="order_total_title">Order Total:</div>
                                    <div className="order_total_amount">{cartTotal}</div>
                                </div>
                            </div>
                            <div className="cart_buttons">
                                <button type="button" className="button cart_button_clear">Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panier;