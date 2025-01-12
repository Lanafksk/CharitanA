import "./App.css";
import Footer from "./components/footer";
import RouteConfig from "./router/RouteConfig";
import { BrowserRouter } from "react-router-dom";
import { APIProvider } from "./utils/auth/APIContext";


function App() {
  return (
    <div className="App">
      <APIProvider>
        <BrowserRouter>
          <main>
            <RouteConfig />
          </main>
        </BrowserRouter>
        <Footer />
      </APIProvider>
    </div>
  );
}

export default App;
