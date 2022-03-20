import React from 'react';
//import "./objetPage.css";
import { Link, useNavigate } from 'react-router-dom';

function Historique() {

    return (
        <div className="container">
            <div className="jumbotron">
                <br/>
                <h1 className="">Gestion de collection d'objets</h1>
                <p className="lead">Vous pouvez gérer ou achter des collections d'objets simplemeent sur notre site iRayBuy en vendant vos objets ou en achetant des objets d'autres utilisateurs !</p>
                <br/>
                <div className = "choice">
                    <Link to={'/historique/vente'} className="btn btn-lg btn-primary choice" role="button">Historique Vente</Link>
                    <Link to={'/historique/Achat'} className="btn btn-lg btn-primary choice" role="button">Historique Achat</Link>
                </div>
            </div>
        </div>
    )
}

export default Historique;