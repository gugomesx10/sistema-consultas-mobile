import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { StatusConsulta } from "../types/statusConsulta";
import { Consulta } from "../interfaces/consulta";
import {
  listarConsultasPorStatus,
  listarConsultasFuturas,
  confirmarConsulta,
  cancelarConsulta,
} from "../utils/consultaFunctions";
import { useAppContext } from "../context/AppContext";
import styles from "../styles/consultasList.styles";

type ConsultasListNav = NativeStackNavigationProp<RootStackParamList, "ConsultasList">;
type Filtro = StatusConsulta | "todas" | "futuras";

export default function ConsultasListScreen() {
  const navigation = useNavigation<ConsultasListNav>();
  const { consultas, setConsultas } = useAppContext();
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
