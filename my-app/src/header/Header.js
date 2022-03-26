import React, {useState, useEffect} from "react";
import "./header.css";
import {Nav, Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="dark" sticky="top" expand="lg" collapseOnSelect>
            <Navbar.Brand>
                <a className="navbar-brand" href="#" style={{color:"white"}}>iRayBuy</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className='m-auto'>
                    <Nav.Link className="link" href="/Accueil">Accueil</Nav.Link>
                    <Nav.Link className="link" href="/Objet">Objets</Nav.Link>
                    <Nav.Link className="link" href="/Estimer">Estimer</Nav.Link>
                    {window.sessionStorage.hasOwnProperty("userID") ? (
                        <>
                            <Nav.Link className="link" href="/historique">Historique</Nav.Link>
                            <Nav.Link className="link" href="/panier">Panier</Nav.Link>
                            <Nav.Link className="link" href="/deconnexion">Deconnexion</Nav.Link>
                        </>)
                        :<Nav.Link className="link" href="/connexion">Connexion/inscription</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;