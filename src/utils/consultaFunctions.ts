import { Medico } from "../interfaces/medico";
import { Paciente } from "../types/paciente";
import { StatusConsulta } from "../types/statusConsulta";
import { Consulta } from "../interfaces/consulta";

//aqui eu criei a função pra criar uma consulta nova, já começa com status "agendada"
export function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta {
  return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "agendada",
  };
}

//aqui confirma a consulta, usa spread operator pra copiar e só muda o status
export function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

//aqui cancela a consulta, mas se já foi realizada retorna null (não pode cancelar)
export function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }
  return {
    ...consulta,
    status: "cancelada",
  };
}

//aqui filtra as consultas pelo status, ex: só as agendadas, só as canceladas...
export function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
  return consultas.filter((consulta) => consulta.status === status);
}

//aqui pega só as consultas futuras, compara a data da consulta com a data de hoje
export function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return consultas.filter((consulta) => consulta.data >= hoje);
}

//aqui calcula o faturamento somando o valor só das consultas realizadas
//usei filter + reduce pra isso
export function calcularFaturamento(consultas: Consulta[]): number {
  return consultas
    .filter((consulta) => consulta.status === "realizada")
    .reduce((total, consulta) => total + consulta.valor, 0);
}
