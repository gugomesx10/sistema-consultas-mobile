import { Medico } from "./medico";
import { Paciente } from "../types/paciente";
import { StatusConsulta } from "../types/statusConsulta";

//aqui é a interface principal do projeto, a Consulta
//ela junta tudo: médico, paciente, data, valor e o status
//observacoes é opcional caso queira anotar algo
export interface Consulta {
  id: number;
  medico: Medico; //referencia a interface Medico
  paciente: Paciente; //referencia o type Paciente
  data: Date;
  valor: number;
  status: StatusConsulta; //só aceita os 4 status que defini
  observacoes?: string; //opcional
}