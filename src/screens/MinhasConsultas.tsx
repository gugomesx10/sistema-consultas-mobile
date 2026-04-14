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
import { consultasIniciais, paciente1 } from "../data/consultasData";

type MinhasConsultasNav = NativeStackNavigationProp<RootStackParamList, "MinhasConsultas">;

export default function MinhasConsultas() {
  const navigation = useNavigation<MinhasConsultasNav>();

  // Simula consultas do paciente logado (paciente1)
  const minhasConsultas: Consulta[] = consultasIniciais.filter(
    (c) => c.paciente.id === paciente1.id
  );

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
        <Text style={styles.titulo}>Minhas Consultas</Text>
        <Text style={styles.descricao}>
          Consultas de {paciente1.nome}
        </Text>

        {minhasConsultas.map((consulta) => (
          <TouchableOpacity
            key={consulta.id}
            style={styles.consultaItem}
            onPress={() =>
              navigation.navigate("ConsultaDetalhes", {
                consultaId: consulta.id,
              })
            }
          >
            <View style={styles.consultaHeader}>
              <Text style={styles.consultaMedico}>
                👨‍⚕️ {consulta.medico.nome}
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
            <Text style={styles.consultaEspecialidade}>
              {consulta.medico.especialidade.nome}
            </Text>
            <View style={styles.consultaFooter}>
              <Text style={styles.consultaData}>
                📅 {consulta.data.toLocaleDateString("pt-BR")}
              </Text>
              <Text style={styles.consultaValor}>
                {consulta.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {minhasConsultas.length === 0 && (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>
              Você não possui consultas registradas.
            </Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
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
  consultaMedico: {
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
  consultaEspecialidade: {
    fontSize: 14,
    color: "#79059C",
    marginBottom: 8,
  },
  consultaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  consultaData: {
    fontSize: 14,
    color: "#666",
  },
  consultaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
