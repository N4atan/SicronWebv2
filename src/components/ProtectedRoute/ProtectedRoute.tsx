import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../services/user.service";
import { Oval } from "react-loader-spinner";

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
    children?: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
    const { user, loading, signed } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        );
    }

    // 1. Verifica se está logado
    if (!signed || !user) {
        // Redireciona para login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    // 2. Verifica as permissões (Se houver restrição de roles)
    if (allowedRoles && allowedRoles.length > 0) {
        // Se o usuario não tem role definida ou a role dele não está na lista permitida
        if (!user.role || !allowedRoles.includes(user.role)) {
            // Redireciona para página de "Não autorizado" ou Home
            // Ou poderia ser um componente de AccessDenied
            alert("Acesso negado: Você não tem permissão para acessar esta página.")
            return <Navigate to="/" replace />;
        }
    }

    // Se passou por tudo, renderiza o conteúdo
    // Outlet serve para rotas aninhadas, children para wrapping direto
    return children ? <>{children}</> : <Outlet />;
}
