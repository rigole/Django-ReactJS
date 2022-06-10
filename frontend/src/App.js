import './App.css';
import { Container } from "react-bootstrap";
import { Routes, Route  } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import Footer from "./components/Footer";
import CartScreen    from "./screen/CartScren";


function App() {
  return (
    <div>
         <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen/>} exact/>
                        <Route path="/product/:id" element={<ProductScreen/>} />
                        <Route path="/product/:id?" element={<CartScreen/>}/>
                    </Routes>
                </Container>
            </main>
        <Footer/>
    </div>
  );
}

export default App;
