import "./App.css";
import Footer from "./components/footer";
import RouteConfig from "./router/RouteConfig";
import { BrowserRouter } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <RouteConfig />
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
