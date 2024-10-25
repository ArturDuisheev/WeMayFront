import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useProfile } from "./hooks/useProfile";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "./store/store";
import { setIsAuth, setIsAuthOpen } from "./store/slices/authSlice";
import Notification from "./components/ui/notification/Notification";
import Auth from "./components/auth/Auth";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useAppDispatch();
  const isAuthOpen = useSelector((state: RootState) => state.auth.isAuthOpen);
  const { isSuccess } = useProfile(false);

  useEffect(() => {
    isSuccess && dispatch(setIsAuth(true));
  }, [isSuccess]);

  const setIsAuthOpenFunc = (value: boolean) => {
    dispatch(setIsAuthOpen(value));
  };

  return (
    <div className="App">
      <Header setIsAuthOpen={setIsAuthOpenFunc} />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
      <Auth
        type="login"
        isOpen={isAuthOpen}
        close={() => setIsAuthOpenFunc(false)}
      />
      <Notification />
    </div>
  );
}

export default App;
