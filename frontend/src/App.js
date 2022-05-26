import './App.css';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
         <Header/>
            <main className="py-3">
                <Container>
                    <HomeScreen/>
                </Container>
            </main>
        <Footer/>
    </div>
  );
}

export default App;
