import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Routes, Route, Redirect } from 'react-router-dom';
import Connexion from './authentification/connexion';
import Inscription from './authentification/inscription';
import ObjetPage from './ObjetPage/objetPage';
import Vendre from './Vendre/vendre';
import ListeVente from './listeVenteAchat/listeVente';
import PrivateRoute from './privateRoute';
function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route exact path="/connexion" element = {<Connexion />} />
            <Route exact path="/inscription" element = {<Inscription />} />
            <Route exact path="/Objet" element = {<ObjetPage />} />
            <Route exact path={"/vendre"} element = {<Vendre />} />
            <Route exact path='/historique/vente' element={<PrivateRoute component={ListeVente}/>}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
