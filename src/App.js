import { Route, Routes } from "react-router-dom";
import React, { Suspense, useContext } from "react";

import Sidebar from "./components/Navigation/Sidebar";
import Navbar from "./components/Navigation/Navbar";
import HomePage from "./components/HomePage";

import GlobalContexts from "./components/context/global-contexts";
import classes from "./App.module.css";

import { Box, Stack } from "@mui/material";

const ArticlesPage = React.lazy(() => import("./components/ArticlesPage"));
const ProfilePage = React.lazy(() => import("./components/ProfilePage"));
const ShopsPage = React.lazy(() => import("./components/ShopsPage"));
const FavoritesPage = React.lazy(() => import("./components/FavoritesPage"));
const LogIn = React.lazy(() => import("./components/LogInPage"));

function App() {
  const globalContxts = useContext(GlobalContexts);
  const activate = globalContxts.activeMenu;

  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
      <Stack direction="row" className={classes.stack}>
        {activate ? <Sidebar /> : ""}
        {/* to use lazy loading and improve loading performances */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* <Route path="/" element={<Navigate replace to="/profile" />} /> */}

            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />

            <Route path="/logIn" element={<LogIn />} />
          </Routes>
        </Suspense>
      </Stack>
    </Box>
  );
}

export default App;
