import React, {useEffect, useState} from "react";
import axios, { post } from 'axios';
function CreerCollection() {
    const [nom, setNom] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const urlDisplay = "http://localhost:8081/api/Items/"+window.sessionStorage.getItem("userID");
    axios.defaults.headers.common['authorization'] = window.sessionStorage.getItem("token");
    const fetchProducts = async () => {
        var data = [];
        await axios.get(urlDisplay).then(res => {
            data = (res.data.info);
        });
        setProducts(data.filter(item => item.idCollection == 0 || item.idCollection == null));
    };

    const deleteProduct = (id) => {
        setSelectedProduct(selectedProduct.filter(item => item.idObjet !== id));
    }
    const addToCollection = (id) => {
        var items = selectedProduct || [];
        const index = products.findIndex(product => product.idObjet == id);

        if (index == -1) {
            return;
        }
        if (items.some(item => item.idObjet == id)) {
            return;
        }
        items.push(products[index]);
        setSelectedProduct(items);
        console.log(selectedProduct);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/api/createCollection/"+window.sessionStorage.getItem("userID"), { nom : nom }).then(res => {
            if (res.data.message == "Collection crée") {
                var collectionID = res.data.collectionID;
                selectedProduct.map(product => {
                    axios.post("http://localhost:8081/api/addItemToCollection/"+product.idObjet+"/"+collectionID).then(res => {

                    })
                })
                window.location.href = "/";
            }
        })
    }
    useEffect(() => {
        fetchProducts();
    }, [products])

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <br />
            <h1>Formulaire de création de collection</h1>
                <div className="form-group">
                    <label required="required">Nom de la collection d'objet</label>
                    <input type="text" name="type" className="form-control" placeholder="nom" onChange={(e) => setNom(e.target.value)}/>
                </div>
                <div className="form-group">
                    {products && products.map((product) => {
                        return <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Product</th>
                                            <th scope="col" className="text-right">Price</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><img src={"http://localhost:8081/images/"+product.image}/></td>
                                            <td>{product.nomObjet}</td>
                                            <td>{product.prix} €</td>
                                            <td className="text-right">
                                                {selectedProduct.some(item => item.idObjet == product.idObjet) ?
                                                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product.idObjet)}>Retirer</button> :
                                                    <button className="btn btn-sm btn-success" onClick={() => addToCollection(product.idObjet)}>Ajouter</button>}

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <br/>
                <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}

export default CreerCollection;