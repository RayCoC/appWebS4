import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './estimation.css'
function Estimation() {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [link, setLink] = useState("");
    const searchHandler = async (e) => {
        e.preventDefault();
        const params = {
            api_key: "069A17828E0C4D6AB7B1898DEB8A629B",
            ebay_domain: "ebay.com",
            type: "search",
            search_term: search
        }
        await axios.get("https://api.countdownapi.com/request", {params}).then(response=> {
            if (response.data) {
                setProducts(response.data.search_results);
            }
            else {
                setProducts([]);
            }
        }).catch(error => {
            console.log(error);
        });
        console.log(products);
    }
    return(
        <div className="container">
            <div className="jumbotron">
                <br/>
                <h1 className="">Estimation de vos objets</h1>
                <p className="lead">Vous pouvez faire une estimation de vos objets en ligne simplement et rapidement en entrant le nom des objets que vous soihaitez estimer</p>
                <br/>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card card-sm">
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col">
                                <input className="form-control form-control-lg form-control-borderless"
                                       type="search" placeholder={"Tapez un nom d'objet ..."} onChange={(e) => setSearch(e.target.value)}/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-lg btn-primary" type="submit" onClick={(e) => searchHandler(e)}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container p-0 mt-5 mb-5">
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
                    {products?.length > 0 ? products && products.map((product, index) => {
                        return <div className="col" key={product.position}>
                            <div className="card">
                                <h1>{product.title}</h1>
                                <i className="bi bi-heart-fill"></i>
                                <img src={product.image}
                                     className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h4 className="card-text text-danger">{product.price.value}$</h4>
                                    <a href={product.link}><button type="button" className="btn btn-outline-primary">Voir produit</button></a>
                                </div>
                            </div>
                        </div>
                    }):
                        <div>
                        </div>}
                </div>
            </div>
        </div>

    )
}

export default Estimation;