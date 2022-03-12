import React, { useState } from 'react'
import axios from 'axios';
import './connexion.css';
import { Link, useNavigate } from 'react-router-dom';


function Connexion () {
    /*constructor(props) {
        super(props);
        this.state = {login : "",token : "", logged : false, message : "", compteur : 0};
    }
*/
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [compteur, setCompteur] = useState(0);
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        let data = {};
        data.login = login;
        data.password = password;

        axios.post('http://localhost:8081/api/connexion', {
            login : login,
            password :""
            }
        ).then(res => {
            if (! res.data.user) {
                setLogged(false);
                setCompteur(compteur+1);
                setMessage(res.data.message);
            }
            else {
                localStorage.setItem("token", "Bearer" + res.data.token);
                localStorage.setItem("user", res.data.user.login);
                navigate("/inscription");
            }
        })
    }
        return (
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            {logged == false && compteur>0 &&(<div className="alert alert-danger" role="alert">
                                {message}
                            </div>)}
                            <form onSubmit={handleSubmit}>
                                <h1>Connexion</h1>
                                <div className="form-outline mb-4">
                                    <input type="text" name="login" className="form-control form-control-lg"
                                           placeholder="login" onChange={(e) => setLogin(e.target.value)}/>
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" name="pass" className="form-control form-control-lg"
                                           placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                    >Connexion
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Vous n'avez pas de compte ? <Link
                                        to={'/inscription'} className="link-danger">Inscription</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
export default Connexion;