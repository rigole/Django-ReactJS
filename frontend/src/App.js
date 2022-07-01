import './App.css';
import { Container } from "react-bootstrap";
import { Routes, Route  } from "react-router-dom";
import Header from "./components/Header";
import HomeComponent from "./screen/HomeComponent";
import ProductScreen from "./screen/ProductScreen";
import Footer from "./components/Footer";
import CartScreen from "./screen/CartComponent";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileComponent from "./screen/ProfileComponent";


function App() {
  return (
    <div>
         <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeComponent/>} exact/>
                        <Route path="/product/:id" element={<ProductScreen/>} />
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path='/register' element={<RegisterScreen/>}/>
                        <Route path="/cart/:id" element={<CartScreen/>}/>
                        <Route path="/profile" element={<ProfileComponent/>}/>
                        <Route path="/cart" element={<CartScreen/>}/>
                    </Routes>
                </Container>
            </main>
        <Footer/>
    </div>
  );
}

export default App;
