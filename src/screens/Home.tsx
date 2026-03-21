import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Especialidade } from "../types/especialidade";
import { Paciente } from "../types/paciente";
import { StatusConsulta } from "../types/statusConsulta";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import {
  criarConsulta,
  confirmarConsulta,
  cancelarConsulta,
  listarConsultasPorStatus,
} from "../utils/consultaFunctions";

// ── Especialidades ────────────────────────────────────────────────────────────
const cardiologia: Especialidade = { id: 1, nome: "Cardiologia" };
const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
  descricao: "Tratamento de ossos e articulações",
};
const pediatria: Especialidade = { id: 3, nome: "Pediatria" };

// ── Médicos ───────────────────────────────────────────────────────────────────
const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};
const medico2: Medico = {
  id: 2,
  nome: "Dra. Fernanda Costa",
  crm: "CRM67890",
  especialidade: ortopedia,
  ativo: true,
};
const medico3: Medico = {
  id: 3,
  nome: "Dr. Paulo Mendes",
  crm: "CRM11223",
  especialidade: pediatria,
  ativo: true,
};

// ── Pacientes ─────────────────────────────────────────────────────────────────
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
  telefone: "(11) 98765-4321",
};
const paciente2: Paciente = {
  id: 2,
  nome: "Ana Lima",
  cpf: "987.654.321-00",
  email: "ana@email.com",
};
const paciente3: Paciente = {
  id: 3,
  nome: "Marcos Oliveira",
  cpf: "456.123.789-00",
  email: "marcos@email.com",
  telefone: "(21) 91234-5678",
};

// ── Array Tipado de Consultas – Atividade 3 ───────────────────────────────────
// Consulta 1 - Agendada (futura)
const consulta1 = criarConsulta(
  1,
  medico1,
  paciente1,
  new Date(2026, 2, 28),
  350
);

// Consulta 2 - Confirmada (futura)
const consulta2 = confirmarConsulta(
  criarConsulta(2, medico2, paciente2, new Date(2026, 2, 25), 280)
);

// Consulta 3 - Realizada (passado)
const consulta3: Consulta = {
  ...criarConsulta(3, medico3, paciente3, new Date(2026, 1, 10), 200),
  status: "realizada",
};

// Consulta 4 - Cancelada (passado)
const consulta4: Consulta = {
  ...criarConsulta(4, medico1, paciente2, new Date(2026, 1, 15), 400),
  status: "cancelada",
};

// Consulta 5 - Realizada (passado)
const consulta5: Consulta = {
  ...criarConsulta(5, medico2, paciente1, new Date(2026, 0, 20), 320),
  status: "realizada",
};

// Consulta 6 - Agendada (futura)
const consulta6 = criarConsulta(
  6,
  medico3,
  paciente3,
  new Date(2026, 3, 5),
  250
);

const consultasIniciais: Consulta[] = [
  consulta1,
  consulta2,
  consulta3,
  consulta4,
  consulta5,
  consulta6,
];

type Filtro = StatusConsulta | "todas";

export default function Home() {
  const [consultas, setConsultas] = useState<Consulta[]>(consultasIniciais);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  function getConsultasFiltradas(): Consulta[] {
    if (filtro === "todas") return consultas;
    return listarConsultasPorStatus(consultas, filtro);
  }

  function handleConfirmar(id: number) {
    setConsultas((prev) =>
      prev.map((c) => (c.id === id ? confirmarConsulta(c) : c))
    );
  }

  function handleCancelar(id: number) {
    setConsultas((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const resultado = cancelarConsulta(c);
        return resultado ?? c;
      })
    );
  }

  const consultasFiltradas = getConsultasFiltradas();

  const filtros: { label: string; value: Filtro }[] = [
    { label: "Todas", value: "todas" },
    { label: "Agendada", value: "agendada" },
    { label: "Confirmada", value: "confirmada" },
    { label: "Realizada", value: "realizada" },
    { label: "Cancelada", value: "cancelada" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Médicas</Text>
        </View>

        {/* Filtros por Status */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtrosContainer}
        >
          {filtros.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.filtroBotao,
                filtro === f.value && styles.filtroBotaoAtivo,
              ]}
              onPress={() => setFiltro(f.value)}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtro === f.value && styles.filtroTextoAtivo,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.contador}>
          {consultasFiltradas.length} consulta(s) encontrada(s)
        </Text>

        {consultasFiltradas.map((consulta) => (
          <ConsultaCard
            key={consulta.id}
            consulta={consulta}
            onConfirmar={
              consulta.status === "agendada"
                ? () => handleConfirmar(consulta.id)
                : undefined
            }
            onCancelar={
              consulta.status !== "realizada" &&
              consulta.status !== "cancelada"
                ? () => handleCancelar(consulta.id)
                : undefined
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}