import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
