import './App.css';
import { Container } from "react-bootstrap";
import { Routes, Route  } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import CartScreen from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentComponent from "./components/PaymentComponent";
import PlaceOrderPage from "./pages/PlaceOrderPage";


function App() {
  return (
    <div>
         <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage/>} exact/>
                        <Route path="/product/:id" element={<ProductPage/>} />
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path="/cart/:id" element={<CartScreen/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/shipping" element={<ShippingPage/>}/>
                        <Route path="/cart" element={<CartScreen/>}/>
                        <Route path="/placeorder" element={<PlaceOrderPage/>}/>
                        <Route path="/payment" element={<PaymentComponent/>}/>
                    </Routes>
                </Container>
            </main>
        <Footer/>
    </div>
  );
}

export default App;
