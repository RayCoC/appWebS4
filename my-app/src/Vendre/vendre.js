import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./vendre.css";
import axios, { post } from 'axios';
function Vendre() {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [nom, setNom] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [img, setImg] = useState(null);
    const [compteur, setCompteur] = useState(0);
    const [statut , setStatut] = useState(false);

    const handleSubmit = e => {
            e.preventDefault()
            fileUpload(img).then((response)=>{
                if (response.data.message == "objet ajouté") {
                    setStatut(true);
                }
                else {
                    setStatut(false);
                }
                setMessage(response.data.message);
                setCompteur(compteur+1);})
    }
    const fileUpload = file => {
        const url = 'http://localhost:8081/api/addItem/'+window.sessionStorage.getItem("userID");
        const formData = new FormData();
        formData.append('file',file)
        formData.append('name', nom)
        formData.append('price', price)
        formData.append('desc', desc)
        formData.append('desc', desc)
        formData.append('token', window.sessionStorage.getItem("token"))
        formData.append('type', type);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }


    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <br />
            {statut == true && compteur > 0 ? (<div className="alert alert-success" role="alert">
                {message}
            </div>) : compteur > 0 ?
                (<div className="alert alert-danger" role="alert">
                    {message}
                </div>) : (<div></div>)}
                <h1>Formulaire de vente d'objet</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom de l'objet</label>
                        <input type="text" name="fullname" className="form-control" placeholder="Entrer le nom de l'objet" required="required" onChange={(e) => setNom(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label required="required">Prix</label>
                        <input type="text" name="prix" className="form-control" placeholder="Entrer le prix" onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label required="required">Desc</label>
                        <input type="text" name="desc" className="form-control" placeholder="Entrer la description" onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label required="required">Type d'objet</label>
                        <input type="text" name="type" className="form-control" placeholder="Type d'objet" onChange={(e) => setType(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label className="mr-2">Upload your CV:</label><br />
                        <input type="file" name="file" onChange={(e) => setImg(e.target.files[0])} />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}

export default Vendre;