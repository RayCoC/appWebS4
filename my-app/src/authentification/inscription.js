import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Inscription() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [message, setMessage] = useState("");
    const [compteur, setCompteur] = useState(0);


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/api/inscription', {
            login: login,
            password: password,
            nom : nomUtilisateur
        }).then(res => {
            if (! res.data.insc) {
                setCompteur(compteur+1);
                setMessage(res.data.message);
                console.log(res);
            }
            else {
                navigate("/connexion");
            }
        })
    }
        return (
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-8 col-xl-6">
                            <div className="row">
                                <div className="col text-center">
                                    <h1>Inscription</h1>
                                </div>
                            </div>
                            {compteur>0 &&(<div className="alert alert-danger" role="alert">
                                {message}
                            </div>)}
                            <form onSubmit={handleSubmit}>
                                <div className="row align-items-center">
                                    <div className="col mt-4">
                                        <input type="text" className="form-control" placeholder="Nom" onChange={(e) => setNomUtilisateur(e.target.value)}/>
                                    </div>
                                    <div className="col mt-4">
                                        <input type="text" className="form-control" placeholder="login" onChange={(e) => setLogin(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-4">
                                    <div className="col">
                                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row justify-content-start mt-4">
                                    <div className="col">
                                        <button className="btn btn-primary mt-4">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
}
export default Inscription;