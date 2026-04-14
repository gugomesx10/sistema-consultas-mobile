import { Especialidade } from "../types/especialidade";
import { Paciente } from "../types/paciente";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";
import {
  criarConsulta,
  confirmarConsulta,
} from "../utils/consultaFunctions";

// ── Especialidades ────────────────────────────────────────────────────────────
export const cardiologia: Especialidade = { id: 1, nome: "Cardiologia" };
export const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
  descricao: "Tratamento de ossos e articulações",
};
export const pediatria: Especialidade = { id: 3, nome: "Pediatria" };

// ── Médicos ───────────────────────────────────────────────────────────────────
export const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};
export const medico2: Medico = {
  id: 2,
  nome: "Dra. Fernanda Costa",
  crm: "CRM67890",
  especialidade: ortopedia,
  ativo: true,
};
export const medico3: Medico = {
  id: 3,
  nome: "Dr. Paulo Mendes",
  crm: "CRM11223",
  especialidade: pediatria,
  ativo: true,
};

export const medicos: Medico[] = [medico1, medico2, medico3];

// ── Pacientes ─────────────────────────────────────────────────────────────────
export const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
  telefone: "(11) 98765-4321",
};
export const paciente2: Paciente = {
  id: 2,
  nome: "Ana Lima",
  cpf: "987.654.321-00",
  email: "ana@email.com",
};
export const paciente3: Paciente = {
  id: 3,
  nome: "Marcos Oliveira",
  cpf: "456.123.789-00",
  email: "marcos@email.com",
  telefone: "(21) 91234-5678",
};

export const pacientes: Paciente[] = [paciente1, paciente2, paciente3];

// ── Consultas ─────────────────────────────────────────────────────────────────
const consulta1 = criarConsulta(1, medico1, paciente1, new Date(2026, 3, 28), 350);
const consulta2 = confirmarConsulta(
  criarConsulta(2, medico2, paciente2, new Date(2026, 3, 25), 280)
);
const consulta3: Consulta = {
  ...criarConsulta(3, medico3, paciente3, new Date(2026, 1, 10), 200),
  status: "realizada",
};
const consulta4: Consulta = {
  ...criarConsulta(4, medico1, paciente2, new Date(2026, 1, 15), 400),
  status: "cancelada",
};
const consulta5: Consulta = {
  ...criarConsulta(5, medico2, paciente1, new Date(2026, 0, 20), 320),
  status: "realizada",
};
const consulta6 = criarConsulta(6, medico3, paciente3, new Date(2026, 4, 5), 250);

export const consultasIniciais: Consulta[] = [
  consulta1,
  consulta2,
  consulta3,
  consulta4,
  consulta5,
  consulta6,
];
