import React from "react";

class Inscription extends React.Component {
    render() {
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
                            <div className="row align-items-center">
                                <div className="col mt-4">
                                    <input type="text" className="form-control" placeholder="Nom" />
                                </div>
                                <div className="col mt-4">
                                    <input type="text" className="form-control" placeholder="Prenom" />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4">
                                <div className="col">
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4">
                                <div className="col">
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                            </div>
                            <div className="row justify-content-start mt-4">
                                <div className="col">
                                    <button className="btn btn-primary mt-4">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Inscription;