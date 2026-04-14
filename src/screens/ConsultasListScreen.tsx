import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { StatusConsulta } from "../types/statusConsulta";
import { Consulta } from "../interfaces/consulta";
import { consultasIniciais } from "../data/consultasData";
import {
  listarConsultasPorStatus,
  listarConsultasFuturas,
  confirmarConsulta,
  cancelarConsulta,
} from "../utils/consultaFunctions";

type ConsultasListNav = NativeStackNavigationProp<RootStackParamList, "ConsultasList">;
type Filtro = StatusConsulta | "todas" | "futuras";

export default function ConsultasListScreen() {
  const navigation = useNavigation<ConsultasListNav>();
  const [consultas, setConsultas] = useState<Consulta[]>(consultasIniciais);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  function getConsultasFiltradas(): Consulta[] {
    if (filtro === "todas") return consultas;
    if (filtro === "futuras") return listarConsultasFuturas(consultas);
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
    { label: "Futuras", value: "futuras" },
  ];

  function getStatusColor(status: StatusConsulta): string {
    switch (status) {
      case "agendada":
        return "#FFA500";
      case "confirmada":
        return "#4CAF50";
      case "cancelada":
        return "#F44336";
      case "realizada":
        return "#2196F3";
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <TouchableOpacity
            key={consulta.id}
            style={styles.consultaItem}
            onPress={() =>
              navigation.navigate("ConsultaDetalhes", { consultaId: consulta.id })
            }
          >
            <View style={styles.consultaHeader}>
              <Text style={styles.consultaPaciente}>
                {consulta.paciente.nome}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(consulta.status) },
                ]}
              >
                <Text style={styles.statusTexto}>
                  {consulta.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.consultaInfo}>
              👨‍⚕️ {consulta.medico.nome}
            </Text>
            <Text style={styles.consultaInfo}>
              📅 {consulta.data.toLocaleDateString("pt-BR")}
            </Text>
            <Text style={styles.consultaValor}>
              {consulta.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>

            {consulta.status === "agendada" && (
              <View style={styles.acoesRow}>
                <TouchableOpacity
                  style={styles.botaoConfirmar}
                  onPress={() => handleConfirmar(consulta.id)}
                >
                  <Text style={styles.botaoTexto}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoCancelar}
                  onPress={() => handleCancelar(consulta.id)}
                >
                  <Text style={styles.botaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {consultasFiltradas.length === 0 && (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhuma consulta encontrada.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  filtrosContainer: {
    marginBottom: 12,
  },
  filtroBotao: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: "#79059C",
  },
  filtroTexto: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  filtroTextoAtivo: {
    color: "#fff",
  },
  contador: {
    color: "#666",
    fontSize: 13,
    marginBottom: 12,
  },
  consultaItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  consultaPaciente: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTexto: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  consultaInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  consultaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginTop: 4,
  },
  acoesRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  botaoConfirmar: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  botaoCancelar: {
    backgroundColor: "#F44336",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  vazio: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
  },
  vazioTexto: {
    color: "#999",
    fontSize: 16,
  },
});
