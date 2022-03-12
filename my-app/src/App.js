import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Routes, Route, Redirect } from 'react-router-dom';
import Connexion from './authentification/connexion';
import Inscription from './authentification/inscription';
import Vendre from './Vendre/vendre';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route exact path="/connexion" element = {<Connexion />} />
            <Route exact path="/inscription" element = {<Inscription />} />
            <Route exact path="/Vendre" element = {<Vendre />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
