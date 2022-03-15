import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './listeVente.css';

function ListeVente() {

    const [products, setProducts] = useState([]);
    axios.defaults.headers.common['authorization'] = window.sessionStorage.getItem("token");
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
        <div className="container">
            <div className="row bootstrap snippets bootdeys" id="store-list">
                {products && products.map((product) => {
                    return <div className="col-md-6 col-xs-12">
                        <div className="panel">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <img src={"http://localhost:8081/images/"+product.image} className="img-responsive" />
                                    </div>
                                    <div className="col-sm-7">
                                        <h4 className="title-store">
                                            <strong><a href="#">{product.nomObjet}</a></strong>
                                        </h4>
                                        <hr />
                                        <p>{product.description}</p>
                                        <p className="btn btn-default">{product.prix}$</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ListeVente;
/*{products.map((product) => {
    <p>ok</p>
})}*/