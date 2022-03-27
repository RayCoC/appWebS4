import React, {useEffect, useState} from "react";
import axios, { post } from 'axios';
function CreerCollection() {
    const [nom, setNom] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([]);
    const urlDisplay = "http://localhost:8081/api/Items/"+window.sessionStorage.getItem("userID");
    axios.defaults.headers.common['authorization'] = window.sessionStorage.getItem("token");
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    const fetchProducts = async () => {
        await axios.get(urlDisplay).then(res => {
            setProducts(res.data.info);
        });
    };

    const deleteProduct = () => {

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
    useEffect(() => {
        fetchProducts();
    }, [products])

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <br />
            <h1>Formulaire de création de collection</h1>
            <form onSubmit={handleSubmit}>
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
                                                <button className="btn btn-sm btn-success" onClick={() => addToCollection(product.idObjet)}>Ajouter</button>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreerCollection;