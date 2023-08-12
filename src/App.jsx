import { useLocation } from "react-router-dom";
import Spinner from "./components/Spinner";
import Sidebar from "./components/Sidebar";
import { useGlobalContext } from "./store/UserContext";

import "./App.css";
import RouterComponent from "./components/RouterComponent";
import Header from "./components/Header";

function App() {
  const { loading } = useGlobalContext();

  const { pathname } = useLocation();
  return (
    <div className="main__page">
      {loading && <Spinner />}
      {pathname !== "/" && <Sidebar />}
      <section className="main__section">
        <Header />
        <RouterComponent />
      </section>
    </div>
  );
}

export default App;
