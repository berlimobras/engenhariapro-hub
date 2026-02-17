import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Shield } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAdminAccess = (e: React.FormEvent) => {
        e.preventDefault();

        // Senha de acesso administrativo simplificada
        if (password === "admin123") {
            localStorage.setItem("admin_access", "true");
            navigate("/admin/dashboard");
        } else {
            setError("Senha incorreta");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-4">
            <Card className="w-full max-w-md border-purple-500/20">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-600 text-white">
                            <Shield className="h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Acesso Administrativo</CardTitle>
                    <CardDescription>Área restrita para gerenciamento do sistema</CardDescription>
                </CardHeader>
                <form onSubmit={handleAdminAccess}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="admin-password">Senha de Administrador</Label>
                            <Input
                                id="admin-password"
                                type="password"
                                placeholder="Digite a senha admin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                            Acessar Painel Admin
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => navigate("/login")}
                        >
                            Voltar ao Login Normal
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
