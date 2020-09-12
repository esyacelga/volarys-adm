import {PersonaInterface} from './PersonaInterface';
import {UsuarioInterface} from './UsuarioInterface';

export interface TipoUsuarioPersonaInterface {
    _id: string;
    persona: PersonaInterface;
    usuario: UsuarioInterface;

};
