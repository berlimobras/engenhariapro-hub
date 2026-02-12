import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import InteligenciaTecnica from "./pages/InteligenciaTecnica";
import Marketing from "./pages/Marketing";
import Planilhas from "./pages/Planilhas";
import Prompts from "./pages/Prompts";
import Contratos from "./pages/Contratos";
import Checklists from "./pages/Checklists";
import Atualizacoes from "./pages/Atualizacoes";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/inteligencia" element={<InteligenciaTecnica />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/planilhas" element={<Planilhas />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/checklists" element={<Checklists />} />
              <Route path="/atualizacoes" element={<Atualizacoes />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
