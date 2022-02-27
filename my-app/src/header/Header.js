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
                    <Nav.Link className="link" href="Accueil">Accueil</Nav.Link>
                    <Nav.Link className="link" href="Vendre">Vendre</Nav.Link>
                    <Nav.Link className="link" href="Estimer">Estimer</Nav.Link>
                    <Nav.Link className="link" href="Account">Mon compte</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
       /* <header className="header">
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
    </header>*/
    )
}
export default Header;