import React, {useState, useEffect} from "react";
import "./header.css"

const Header = () => {
    return (
        <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">iRayBuy</a>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Accueil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Vendre</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Estimer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    )
}
export default Header;