//aqui é o type do paciente, com os dados básicos dele
//telefone é opcional porque nem todo paciente cadastra
export type Paciente = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string; //opcional
};