import { Medico } from "../interfaces/medico";
import { Paciente } from "../types/paciente";
import { StatusConsulta } from "../types/statusConsulta";
import { Consulta } from "../interfaces/consulta";

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

export function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

export function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }
  return {
    ...consulta,
    status: "cancelada",
  };
}

// Atividade 1 – Listar Consultas por Status
export function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
  return consultas.filter((consulta) => consulta.status === status);
}
