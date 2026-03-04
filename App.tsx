import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

// Importando a modelagem TypeScript que criamos nas aulas anteriores
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

export default function App() {
  // Dados base (simulando o que tínhamos no backend)
  const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
    descricao: "Cuidados com o coração",
  };

  const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
  };

  const paciente1: Paciente = {
    id: 1,
    nome: "Gustavo Gomes Martins",
    cpf: "123.456.789-00",
    email: "rm555999@fiap.com.br",
    telefone: "(11) 96447-5266",
  };

  // Estado da consulta
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10), // 10/03/2026
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  // Funções para manipular a consulta
  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  // Função para formatar valor em reais
  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Função para formatar data
  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerIcone}>🏥</Text>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Gerencie suas consultas médicas</Text>
        </View>

        {/* Card da Consulta */}
        <View style={styles.card}>

          {/* Status + ID */}
          <View style={styles.statusRow}>
            <View style={[
              styles.statusBadge,
              consulta.status === "confirmada" && styles.statusConfirmada,
              consulta.status === "cancelada" && styles.statusCancelada,
            ]}>
              <View style={styles.statusPonto} />
              <Text style={styles.statusTexto}>{consulta.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.consultaId}>#{consulta.id}</Text>
          </View>

          {/* Informações do Médico */}
          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <Text>👨‍⚕️</Text>
              <Text style={styles.label}>Médico</Text>
            </View>
            <Text style={styles.valor}>{consulta.medico.nome}</Text>
            <Text style={styles.info}>CRM: {consulta.medico.crm}</Text>
            <Text style={styles.info}>{consulta.medico.especialidade.nome}</Text>
          </View>

          {/* Informações do Paciente */}
          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <Text>👤</Text>
              <Text style={styles.label}>Paciente</Text>
            </View>
            <Text style={styles.valor}>{consulta.paciente.nome}</Text>
            <Text style={styles.info}>CPF: {consulta.paciente.cpf}</Text>
            <Text style={styles.info}>Email: {consulta.paciente.email}</Text>
            {consulta.paciente.telefone && (
              <Text style={styles.info}>Tel: {consulta.paciente.telefone}</Text>
            )}
          </View>

          {/* Informações da Consulta */}
          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <Text>📅</Text>
              <Text style={styles.label}>Dados da Consulta</Text>
            </View>
            <Text style={styles.valor}>Data: {formatarData(consulta.data)}</Text>
            <Text style={styles.valor}>Valor: {formatarValor(consulta.valor)}</Text>
            {consulta.observacoes && (
              <View style={styles.observacoesBox}>
                <Text style={styles.observacoes}>"{consulta.observacoes}"</Text>
              </View>
            )}
          </View>

          {/* Botões de Ação */}
          <View style={styles.acoes}>
            {consulta.status === "agendada" && (
              <>
                <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmarConsulta}>
                  <Text style={styles.botaoConfirmarTexto}>✓ Confirmar Consulta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarConsulta}>
                  <Text style={styles.botaoCancelarTexto}>✕ Cancelar Consulta</Text>
                </TouchableOpacity>
              </>
            )}
            {consulta.status === "confirmada" && (
              <View style={styles.mensagem}>
                <Text style={styles.mensagemIcone}>🎉</Text>
                <Text style={styles.mensagemTexto}>Consulta confirmada!</Text>
                <Text style={styles.mensagemSubTexto}>Tudo certo, até o dia da consulta.</Text>
              </View>
            )}
            {consulta.status === "cancelada" && (
              <View style={styles.mensagemCancelada}>
                <Text style={styles.mensagemIcone}>❌</Text>
                <Text style={styles.mensagemTexto}>Consulta cancelada</Text>
                <Text style={styles.mensagemSubTexto}>Entre em contato para reagendar.</Text>
              </View>
            )}
          </View>
        </View>

        {/* Rodapé */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>Sistema de Consultas Médicas · FIAP 2TDSPO</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b6fdc99a",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  headerIcone: {
    fontSize: 48,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.3,
  },

  // ── Card ────────────────────────────────────────────────
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  // ── Status Badge ────────────────────────────────────────
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  statusBadge: {
    backgroundColor: "#FFA500",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statusPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginRight: 6,
  },
  statusConfirmada: {
    backgroundColor: "#2E7D32",
  },
  statusCancelada: {
    backgroundColor: "#C62828",
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: 1,
  },
  consultaId: {
    fontSize: 13,
    color: "#aaa",
    fontWeight: "500",
  },

  // ── Seção ────────────────────────────────────────────────
  secao: {
    backgroundColor: "#F9F4FB",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  secaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#350039fc",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginLeft: 6,
  },
  valor: {
    fontSize: 17,
    color: "#1a1a1a",
    fontWeight: "600",
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: "#666",
    marginBottom: 3,
  },
  observacoesBox: {
    marginTop: 10,
    backgroundColor: "#F3E5F5",
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#710991",
  },
  observacoes: {
    fontSize: 13,
    color: "#555",
    fontStyle: "italic",
    lineHeight: 20,
  },

  // ── Divisor ──────────────────────────────────────────────
  divisor: {
    height: 1,
    backgroundColor: "#EDE7F6",
    marginVertical: 6,
  },

  // ── Ações ────────────────────────────────────────────────
  acoes: {
    marginTop: 6,
    gap: 10,
  },
  botaoConfirmar: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  botaoCancelar: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#C62828",
  },
  botaoConfirmarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  botaoCancelarTexto: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },

  // ── Mensagens de Feedback ────────────────────────────────
  mensagem: {
    backgroundColor: "#E8F5E9",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A5D6A7",
  },
  mensagemCancelada: {
    backgroundColor: "#FFEBEE",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  mensagemIcone: {
    fontSize: 30,
    marginBottom: 6,
  },
  mensagemTexto: {
    fontSize: 15,
    color: "#333",
    fontWeight: "700",
    textAlign: "center",
  },
  mensagemSubTexto: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },

  // ── Rodapé ────────────────────────────────────────────────
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  rodapeTexto: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    lineHeight: 18,
  },
});