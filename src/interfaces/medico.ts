import { Especialidade } from "../types/especialidade";

//aqui é a interface do médico, usei interface em vez de type pra mostrar que sei usar os dois
//ela tem o CRM, a especialidade (que vem do type que criei) e se o médico tá ativo ou não
export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: Especialidade; //aqui referencia o type Especialidade
  ativo: boolean;
}