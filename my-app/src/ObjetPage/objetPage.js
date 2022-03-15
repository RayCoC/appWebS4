import React from 'react';
import "./objetPage.css";
import { Link, useNavigate } from 'react-router-dom';

function ObjetPage() {

    const navigate = useNavigate();

    const handleClick = e => {
        e.preventDefault();
        if (! window.sessionStorage.hasOwnProperty("token")) {
            navigate("/connexion");
        }
        else {
           navigate("/vendre");
        }
    }

    return (
        <div className="container">
            <div className="jumbotron">
                <br/>
                <h1 className="">Gestion de collection d'objets</h1>
                <p className="lead">Vous pouvez gérer ou achter des collections d'objets simplemeent sur notre site iRayBuy en vendant vos objets ou en achetant des objets d'autres utilisateurs !</p>
                <br/>
                <div className = "choice">
                    <a className="btn btn-lg btn-primary choice" onClick={handleClick} role="button">Vendre</a>
                    <Link to={'/acheter'} className="btn btn-lg btn-primary choice" role="button">Acheter</Link>
                </div>
            </div>
        </div>
    )
}

export default ObjetPage;