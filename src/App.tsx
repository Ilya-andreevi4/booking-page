import "./styles/App.pcss";
import RegistrationPage from "./pages/registration-page";
import Header from "./components/header";
import Wrapper from "./components/wrapper";
import { useSelector } from "react-redux";
import Footer from "./components/footer";

function App() {
  const { mode } = useSelector((state: RootState) => state.registration);
  return (
    <div className="app">
      <Header />
      <h1 className="title app__title">Страница бронирования конного тура</h1>
      <RegistrationPage />
      <Footer />
      {(mode === "error" || mode === "loading" || mode === "success") && <Wrapper />}
    </div>
  );
}

export default App;
