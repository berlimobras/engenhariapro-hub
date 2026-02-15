import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Settings, FileText, Database, Mail } from "lucide-react";

export default function AdminDashboard() {
    const navigate = useNavigate();

    /* Admin access check removed for open access */
    /* useEffect(() => {
        const adminAccess = localStorage.getItem("admin_access");
        if (adminAccess !== "true") {
            navigate("/admin");
        }
    }, [navigate]); */

    const adminTools = [
        {
            title: "Usuários",
            description: "Gerenciar contas e permissões",
            icon: Users,
            action: () => window.open("https://supabase.com/dashboard/project/viderenotpcoaoyrjzhk/auth/users", "_blank"),
            color: "bg-blue-500"
        },
        {
            title: "Database",
            description: "Visualizar e editar banco de dados",
            icon: Database,
            action: () => window.open("https://supabase.com/dashboard/project/viderenotpcoaoyrjzhk/editor", "_blank"),
            color: "bg-green-500"
        },
        {
            title: "Configurações Email",
            description: "Resend e configurações SMTP",
            icon: Mail,
            action: () => window.open("https://resend.com/domains", "_blank"),
            color: "bg-purple-500"
        },
        {
            title: "Páginas do App",
            description: "Gerenciar todas as páginas",
            icon: FileText,
            action: () => navigate("/"),
            color: "bg-orange-500"
        },
        {
            title: "Configurações Gerais",
            description: "Ajustes do sistema",
            icon: Settings,
            action: () => alert("Em desenvolvimento"),
            color: "bg-gray-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <Shield className="h-10 w-10 text-purple-400" />
                            Painel Administrativo
                        </h1>
                        <p className="text-slate-300">Hub de gerenciamento do EngenhariaPro</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            localStorage.removeItem("admin_access");
                            navigate("/admin");
                        }}
                    >
                        Sair
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminTools.map((tool) => (
                        <Card
                            key={tool.title}
                            className="border-slate-700 bg-slate-800/50 backdrop-blur hover:bg-slate-800/70 transition-all cursor-pointer"
                            onClick={tool.action}
                        >
                            <CardHeader>
                                <div className={`h-12 w-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                                    <tool.icon className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-white">{tool.title}</CardTitle>
                                <CardDescription className="text-slate-400">{tool.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className="mt-8 border-yellow-500/20 bg-yellow-500/5">
                    <CardHeader>
                        <CardTitle className="text-yellow-500">⚠️ Acesso Rápido de Desenvolvimento</CardTitle>
                        <CardDescription className="text-slate-300">
                            Este painel admin usa uma senha simplificada. Para produção, recomenda-se implementar autenticação completa com permissões baseadas em roles no Supabase.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
