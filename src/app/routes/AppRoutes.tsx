import { Navigate, Route, Routes } from "react-router-dom";
import { GuardedRoute } from "../../guards/GuardedRoute";
import { useStore } from "../../context/ContextProvider";
import { AppLayout } from "../layout/AppLayout";
import { MenuRecetasPage } from "../pages/MenuRecetasPage";
import { RecetasGuardadasPage } from "../pages/RecetasGuardadasPage";

export const AppRoutes = () => {

  const auth = useStore();

  return (
    <Routes>
      <Route path="/" element={
        <GuardedRoute auth={auth}>
          <Navigate to="/app/menu"/>
        </GuardedRoute>
      }/>
      <Route path="/menu" element={
        <GuardedRoute auth={auth}>
          <AppLayout/>
        </GuardedRoute>
      }
      children={
        <>
          <Route path="recetas-menu" element={
          <GuardedRoute auth={auth}>
            <MenuRecetasPage/>
          </GuardedRoute>
          }/>
          <Route path="recetas-guardadas" element={
          <GuardedRoute auth={auth}>
            <RecetasGuardadasPage/>
          </GuardedRoute>
          }/>
        </>
      }
      />
    </Routes>
  );
};
