import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useContext } from "react";

import Sidebar from "./components/Navigation/Sidebar";
import Navbar from "./components/Navigation/Navbar";
import HomePage from "./components/HomePage";

import GlobalContexts from "./components/context/global-contexts";

import { Box, Stack } from "@mui/material";
import LoginTokenContexts from "./components/context/login-token-context";

const ArticlesPage = React.lazy(() => import("./components/ArticlesPage"));
const ProfilePage = React.lazy(() => import("./components/ProfilePage"));
const ShopsPage = React.lazy(() => import("./components/ShopsPage"));
const FavoritesPage = React.lazy(() => import("./components/FavoritesPage"));
const LogInPage = React.lazy(() => import("./components/LogInPage"));
const ProfileEdit = React.lazy(() => import("./components/ProfileEditPage"));
const CartPage = React.lazy(() => import("./components/CartPage"));

function App() {
  const { activeMenu } = useContext(GlobalContexts);
  const { userIsLoggedIn } = useContext(LoginTokenContexts);

  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
      <Stack direction="row" className={"stack"}>
        {activeMenu ? <Sidebar /> : ""}
        {/* to use lazy loading and improve loading performances */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* <Route path="/" element={<Navigate replace to="/profile" />} /> */}

            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/cart" element={<CartPage />} />

            {!userIsLoggedIn && <Route path="/logIn" element={<LogInPage />} />}
            {userIsLoggedIn && (
              <Route path="/profileedit" element={<ProfileEdit />} />
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Stack>
    </Box>
  );
}

export default App;
