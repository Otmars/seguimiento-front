export interface Asingatura {
    id:           number;
    nombre?:       string;
    siglaCodigo?:  string;
    cargaHoraria?: number;
    RegNivelEst?:  string;
    nMeses?:       number;
    prerequisito?: string;
    paralelo?:     string;
    deletedAt?:    Date;
    createdAt?:    Date;
    updatedAt?:    Date;
    docente?:      Docente | null;
}

export interface Docente {
    id?:     number;
    iduser?: Iduser;
}

export interface Iduser {
    id?:      string;
    nombres?: string;
}

export interface relacionCompetencia{
    competenciaId: number, 
    asignaturaId: number
}