import React, { useState, useEffect } from 'react'
import axios from 'axios';
import _ from 'lodash';
import './listOfItems.css';


function ListOfItems() {
    const [searchItem, setSearchItem] = useState("");
    const [filter, setFilter] = useState("nomObjet");
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [show, setShow] = useState(false);
    const [collectionProduct, setCollectionProduct] = useState([]);
    const filterByCollectionID = id => {
        setShow(true);
        const values = groupCollection().filter(item => item.idCollection == id);
        setCollectionProduct(values[0].values);
    }
    const searchHandler = async () => {
        var search = searchItem == "" ? "noSearch" : searchItem
        await axios.get("http://localhost:8081/api/search/"+search+"/"+filter+"/"+window.sessionStorage.getItem("userID")).then(response=> {
            if (response.data.all) {
                setProducts(response.data.all);
            }
            else {
                setProducts([]);
            }

        });
    }
    const fetchCollection = async () => {
        var search = searchItem == "" ? "noSearchCollection" : searchItem
        await axios.get("http://localhost:8081/api/search/"+search+"/"+filter+"/"+window.sessionStorage.getItem("userID")).then(res => {
            if (res.data.all) {
                setCollections(res.data.all);
            }
        })
    }
    function addProductToCart(id) {
        var items = JSON.parse(localStorage.getItem("products")) || [];
        const index = products.findIndex(product => product.idObjet == id);

        if (index == -1) {
            return;
        }
        localStorage.setItem("product",JSON.stringify(products[index]));
        items.push(products[index]);
        localStorage.setItem("products", JSON.stringify(items));
    }
    function groupCollection() {
        const result = collections.reduce((accum, current)=> {
            let idCollection = accum.find(x => x.idCollection === current.idCollection);
            if(!idCollection) {
                idCollection = { idCollection: current.idCollection, values: [] }
                accum.push(idCollection);
            }
            idCollection.values.push(current);
            return accum;
        }, []);
        return result;
    }
    function getCollectionPrice() {
        return (collections?.reduce((sum, item) => sum + item.prix, 0));
    }
    useEffect(() => {
        searchHandler();
        fetchCollection();
    }, [products])
    return (
        <div>
            <br/>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card card-sm">
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                                <div className="input-group-text p-0">
                                    <select className="form-select form-select-lg shadow-none bg-light border-0" name="filtre" id="filtre"  onChange={(e) => setFilter(e.target.value)}>
                                        <option value="nomObjet">Nom de l'objet</option>
                                        <option value="typeObjet">type objet</option>
                                        <option value="collection">Collection</option>
                                    </select>
                                </div>
                                <i className="fas fa-search h4 text-body"></i>
                            </div>
                            <div className="col">
                                <input className="form-control form-control-lg form-control-borderless"
                                       type="search" placeholder={"Rechercher ..."} value={searchItem} onChange={(e) => setSearchItem(e.target.value)}/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-lg btn-primary" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container p-0 mt-5 mb-5">
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
                    {products?.length > 0 ? products && show == false && filter !== "collection" && products.map(product => {
                        return <div className="col" key={product.idObjet}>
                            <div className="card">
                                <h1>{product.nomObjet}</h1>
                                <i className="bi bi-heart-fill"></i>
                                <img src={"http://localhost:8081/images/" + product.image}
                                     className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.description}</h5>
                                    <h4 className="card-text text-danger">{product.prix}$</h4>
                                    <button type="button" onClick={() => addProductToCart(product.idObjet)} className="btn btn-outline-primary">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    }):
                        <div>
                        </div>}
                    {collections?.length > 0 ? collections  && show == false && filter == "collection" && groupCollection().map((collection, index) => {
                        return <div className="col" key={index}>
                            <div className="card">
                                <h1>{groupCollection()[index].values[index].titreCollection}</h1>
                                <i className="bi bi-heart-fill"></i>
                                <div className="card-body text-center">
                                    <h4 className="card-text text-danger">{getCollectionPrice()}$</h4>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => filterByCollectionID(collection.idCollection)}>Voir les objets</button>
                                </div>
                            </div>
                        </div>
                    }) :
                    <div>
                    </div>}
                    {collectionProduct.length > 0 ? collectionProduct && show == true && collectionProduct.map((product, index) =>{
                        return <div className="col" key={product.idObjet}>
                            <div className="card">
                                <h1>{product.nomObjet}</h1>
                                <i className="bi bi-heart-fill"></i>
                                <img src={"http://localhost:8081/images/" + product.image}
                                     className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.description}</h5>
                                    <h4 className="card-text text-danger">{product.prix}$</h4>
                                    <button type="button" onClick={() => addProductToCart(product.idObjet)} className="btn btn-outline-primary">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    })
                    : <div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ListOfItems;