import { useLocation } from "react-router-dom";
import Spinner from "./components/Spinner";
import Sidebar from "./components/Sidebar";
import { useGlobalContext } from "./store/UserContext";

import "./App.css";
import RouterComponent from "./components/RouterComponent";
import Header from "./components/Header";
import Userbox from "./components/Userbox";
import Chatbox from "./components/Chatbox";

function App() {
  const { loading, selectedChatUser } = useGlobalContext();

  const { pathname } = useLocation();
  return (
    <div className="main__page">
      {loading && <Spinner />}
      {pathname !== "/" && <Sidebar />}
      <section className="main__section">
        <Header />
        <RouterComponent />
        <>
          {pathname !== "/" && <Userbox />}
          {Object.keys(selectedChatUser).length !== 0 && pathname !== "/" && (
            <Chatbox />
          )}
        </>
      </section>
    </div>
  );
}

export default App;
