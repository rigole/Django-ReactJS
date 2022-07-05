import './App.css';
import { Container } from "react-bootstrap";
import { Routes, Route  } from "react-router-dom";
import Header from "./components/Header";
import HomeComponent from "./screen/HomeComponent";
import ProductComponent from "./screen/ProductComponent";
import Footer from "./components/Footer";
import CartScreen from "./screen/CartComponent";
import LoginComponent from "./screen/LoginComponent";
import RegisterComponent from "./screen/RegisterComponent";
import ProfileComponent from "./screen/ProfileComponent";
import ShippingComponent from "./screen/ShippingComponent";


function App() {
  return (
    <div>
         <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeComponent/>} exact/>
                        <Route path="/product/:id" element={<ProductComponent/>} />
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path='/register' element={<RegisterComponent/>}/>
                        <Route path="/cart/:id" element={<CartScreen/>}/>
                        <Route path="/profile" element={<ProfileComponent/>}/>
                        <Route path="/shipping" element={<ShippingComponent/>}/>
                        <Route path="/cart" element={<CartScreen/>}/>
                    </Routes>
                </Container>
            </main>
        <Footer/>
    </div>
  );
}

export default App;
