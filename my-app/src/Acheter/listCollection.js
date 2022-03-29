import React, { useState, useEffect } from 'react'


function ListCollection({products}) {

    return (
        <div>
            <br/>
            <div className="container p-0 mt-5 mb-5">
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
                    {products?.length > 0 ? products && products.map(product => {
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
                </div>
            </div>
        </div>
    )
}

export default ListCollection;