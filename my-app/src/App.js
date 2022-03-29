import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Routes, Route, Redirect } from 'react-router-dom';
import Connexion from './authentification/connexion';
import Inscription from './authentification/inscription';
import ObjetPage from './ObjetPage/objetPage';
import Vendre from './Vendre/vendre';
import ListeVente from './historique/vente/listeVente';
import PrivateRoute from './privateRoute';
import ListOfItems from './Acheter/listOfItems';
import Historique from './historique/historique';
import Panier from './Panier/panier';
import Estimation from './EstimerPage/esimation';
import CreerCollection from './Collection/creerCollection';
function App() {

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route exact path="/" element={<ObjetPage />} />
            <Route exact path="/connexion" element = {<Connexion />} />
            <Route exact path="/inscription" element = {<Inscription />} />
            <Route exact path={"/vendre"} element = {<Vendre />} />
            <Route exact path='/historique/vente' element={<PrivateRoute component={ListeVente}/>}/>
            <Route exact path='/listOfItems' element={<PrivateRoute component={ListOfItems}/>}/>
            <Route exact path='/historique' element={<PrivateRoute component={Historique}/>}/>
            <Route exact path='/panier' element={<PrivateRoute component={Panier}/>}/>
            <Route exact path={"/Estimer"} element = {<Estimation />} />
            <Route exact path='/creerCollection' element={<PrivateRoute component={CreerCollection}/>}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
