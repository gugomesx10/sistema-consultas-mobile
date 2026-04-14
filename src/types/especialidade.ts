//aqui eu criei o type pra representar a especialidade do médico, tipo cardiologia, ortopedia...
//o descricao é opcional por causa do ?, nem toda especialidade precisa ter
export type Especialidade = {
  id: number;
  nome: string;
  descricao?: string;
};