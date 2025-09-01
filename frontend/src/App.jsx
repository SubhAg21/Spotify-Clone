import React from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import AdminPage from "./pages/AdminPage";
import PlayListPage from './pages/PlayListPage';
import AlbumsPage from "./pages/AlbumsPage";

const App = () => {
  const { loading, user, isAuth } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth?<HomePage />:<LoginPage/>} />
            <Route path="/playlist" element={isAuth?<PlayListPage user={user} />:<LoginPage/>} />
            <Route path="/album/:id" element={isAuth?<AlbumsPage user={user} />:<LoginPage/>} />
            <Route path="/admin" element={isAuth?<AdminPage />:<LoginPage/>} />
            <Route path="/login" element={isAuth?<HomePage />:<LoginPage />} />
            <Route path="/register" element={isAuth?<HomePage />:<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
