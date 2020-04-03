export class Dados {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    constructor() { }

    public toString = (): string => {
        return "Nome: "+this.nome+" ,Email: "+this.email+" ,Telefone: "+this.telefone;
    }
}