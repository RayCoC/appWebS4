import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './listeVente.css';

function ListeVente() {

    const [products, setProducts] = useState([]);
    axios.defaults.headers.common['authorization'] = window.sessionStorage.getItem("token");
    const urlDisplay = "http://localhost:8081/api/Items/"+window.sessionStorage.getItem("userID");

    const deleteProduct = (id) => {
        axios.post("http://localhost:8081/api/deleteItem/"+id).then(res => {
        })
    }
    const fetchProducts = async () => {
        await axios.get(urlDisplay).then(res => {
            setProducts(res.data.info);
        });
    };
    useEffect(() => {
        fetchProducts();
    }, [products])

    return (
        <div className="container">
            <br />
            <h1>Historique des ventes</h1>
            <br/>
            <div className="row bootstrap snippets bootdeys" id="store-list">
                {products && products.map((product) => {
                    return <div className="col-md-6 col-xs-12" key={product.idObjet}>
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
                                        <button type="button" className="btn btn-primary">{product.prix}$</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product.idObjet)}>Retirer</button>
                                        {product.status == null ? (
                                                <div></div>) :
                                            (<button type="button" className="btn btn-secondary">Vendu</button>)}
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