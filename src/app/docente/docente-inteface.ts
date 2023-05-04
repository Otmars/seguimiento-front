export interface Docente {
    id?:     number;
    iduser?: Iduser;
}

export interface Iduser {
    id?:              string;
    username?:        string;
    password?:        string;
    nombres?:         string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    email?:           string;
    telefono?:        number;
    direccion?:       string;
    ci?:              number;
    fnacimiento?:     string;
    createAt?:        Date;
}