export class TipoUsuarioPersona {
    public _id: string;
    public persona: string;
    public usuario: string;
    public tipoUsuario: string;
    public estado: number;

}


export class ModeloTipoUsuarioPersona {
    public _id: string;
    public estado: string;
    public usuario: ModeloUsuario = new ModeloUsuario();
    public persona: ModeloPersona = new ModeloPersona();
    public tipoUsuario: ModeloTipoUsuario = new ModeloTipoUsuario();
    public imagen: string;
}

export class ModeloUsuario {
    public _id: string;
    public clave: string;
    public playerId: string;
    public avatar: string;
    public imagen: string;
}


export class ModeloTipoUsuario {
    public _id: string;
    public descripcion: string;
    public codigo: string;
}

export class ModeloPersona {
    public _id = '';
    public nombres = '';
    public apellidos: string = '';
    public fechaNacimiento: Date;
    public google: boolean = false;
    public displayName: string = '';
    public identificacion: string = '';
    public correo: string = '';
    public sector = '';
    public picture: string = '';
    public avatar: string = '';
    public numeroTelefonoCelular: string = '';
    public numeroTelefonoConvencional: string = '';
}


export class TipoUsuarioPersonaDto extends ModeloPersona {
    public playerId: string = '';
    public clave: string = '';
    public estado: string = '';
    public sector: string = '';
    public tipoUsuario: string = '';
}
