import { PersonaResponse } from "./persona-response.model";
import { RolResponse } from "./rol-response-model";
import { UsuarioLoginResponse } from "./usuario-login-response.model";

export class LoginResponse {
    success: boolean = false;
    mensaje: string = "";
    usuario: UsuarioLoginResponse = new UsuarioLoginResponse;
    token: string = "";
    tokenExpira: string = "";
    refreshToken: string = "";
    rol: RolResponse = new RolResponse;
    persona: PersonaResponse = new PersonaResponse;
}

