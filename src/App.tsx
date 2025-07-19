import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Clientes from "./pages/Clientes";
import ListagemMembros from "./pages/Membros/ListagemMembros";
import NovoMembro from "./pages/Membros/NovoMembro";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil/Perfil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<DashboardLayout />}>
              <Route path="" element={<Perfil/>} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="membros/listagem" element={<ListagemMembros />} />
              <Route path="membros/novo" element={<NovoMembro />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
