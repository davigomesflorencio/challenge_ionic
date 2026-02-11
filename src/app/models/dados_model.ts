export class Dados {
  id: string | undefined;
  nome!: string;
  email!: string;
  telefone!: string;
  latitude: number = 0;
  longitude: number = 0;
  constructor() {}

  public toString = (): string => {
    return (
      'Nome: ' +
      this.nome +
      ' ,Email: ' +
      this.email +
      ' ,Telefone: ' +
      this.telefone +
      ' ,Latitude: ' +
      this.latitude +
      ' ,Longitude: ' +
      this.longitude
    );
  };
}
