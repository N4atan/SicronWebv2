import { createContext } from "react";
import { getAll, User } from "../services/user.service";
import { auth_check, errorAuthService } from "../services/auth.service";

interface AuthContextData {
    signed: boolean;
    user: User;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const signIn = async (email: string) => {
    try {
        const signed = await auth_check();

        if ( !signed ) return alert(errorAuthService);

        const user = await getAll({email});

        // Setar o AuthContext, como?
        AuthContext
    }
}



// try {
//     // Checa inputs vazios.
//     if (anyIsEmpty('l')) return alert('Preencha todos os campos!');

//     console.log('Dados a serem enviados:', email, password)

//     const isLogged = await loginUser({ email, password });

//     if (!isLogged) return alert(errorUserService);

//     alert('Logado com Sucesso!');
//     navigate(`/perfil?email=${email}`);
//     clearData();

// }
// catch (error: unknown) {
//     alert(error);
//     console.log(error);
// }