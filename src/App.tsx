import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import { AppLayout } from "./components/AppLayout";

import { AuthGuard } from "./components/AuthGuard";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Obras from "./pages/Obras";
import ObraDashboard from "./pages/ObraDashboard";
import ObraRelatorio from "./pages/ObraRelatorio";
import Funcionarios from "./pages/Funcionarios";
import FuncionarioPerfil from "./pages/FuncionarioPerfil";
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
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Protegidas */}
            <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
              <Route path="/" element={<Index />} />
              <Route path="/obras" element={<Obras />} />
              <Route path="/obras/:id" element={<ObraDashboard />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/funcionarios/:id" element={<FuncionarioPerfil />} />
              <Route path="/ferramentas/inteligencia" element={<InteligenciaTecnica />} />
              <Route path="/ferramentas/marketing" element={<Marketing />} />
              <Route path="/ferramentas/planilhas" element={<Planilhas />} />
              <Route path="/ferramentas/prompts" element={<Prompts />} />
              <Route path="/ferramentas/contratos" element={<Contratos />} />
              <Route path="/ferramentas/checklists" element={<Checklists />} />
              <Route path="/atualizacoes" element={<Atualizacoes />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
            
            {/* Relatório protegido (se desejar, ou público se passar por ID longo) */}
            <Route path="/obras/:id/relatorio" element={<AuthGuard><ObraRelatorio /></AuthGuard>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
