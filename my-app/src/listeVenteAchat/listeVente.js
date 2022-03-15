import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function ListeVente() {

    const [products, setProducts] = useState(['initial state']);
    axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem("token");
    const url = "http://localhost:8081/api/Items/"+window.sessionStorage.getItem("userID");

    const fetchProducts = async () => {
        await axios.get(url).then(res => {
            console.log(res.data);
            setProducts(res.data.info);
            console.log(products);
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [products])

    return (
        <div>
            <h1>Featured Products</h1>
            {products.map((product,i) => {
                return <p key={i}>{product.nomObjet}</p>
            })}
        </div>
    )
}

export default ListeVente;
/*{products.map((product) => {
    <p>ok</p>
})}*/