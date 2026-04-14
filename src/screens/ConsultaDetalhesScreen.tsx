import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { consultasIniciais } from "../data/consultasData";
import { ConsultaCard } from "../components";

type DetalhesRoute = RouteProp<RootStackParamList, "ConsultaDetalhes">;

export default function ConsultaDetalhesScreen() {
  const route = useRoute<DetalhesRoute>();
  const { consultaId } = route.params;

  const consulta = consultasIniciais.find((c) => c.id === consultaId);

  if (!consulta) {
    return (
      <View style={styles.container}>
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>Consulta não encontrada</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Consulta #{consulta.id}</Text>
          <Text style={styles.subtitulo}>Detalhes da consulta</Text>
        </View>

        <ConsultaCard consulta={consulta} />

        <View style={styles.infoExtra}>
          <Text style={styles.infoExtraLabel}>Informações Adicionais</Text>
          <View style={styles.infoLinha}>
            <Text style={styles.infoChave}>Especialidade:</Text>
            <Text style={styles.infoValor}>
              {consulta.medico.especialidade.nome}
            </Text>
          </View>
          <View style={styles.infoLinha}>
            <Text style={styles.infoChave}>CRM:</Text>
            <Text style={styles.infoValor}>{consulta.medico.crm}</Text>
          </View>
          <View style={styles.infoLinha}>
            <Text style={styles.infoChave}>Médico Ativo:</Text>
            <Text style={styles.infoValor}>
              {consulta.medico.ativo ? "Sim" : "Não"}
            </Text>
          </View>
          {consulta.observacoes && (
            <View style={styles.infoLinha}>
              <Text style={styles.infoChave}>Observações:</Text>
              <Text style={styles.infoValor}>{consulta.observacoes}</Text>
            </View>
          )}
        </View>
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
  tituloContainer: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#79059C",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  erroTexto: {
    fontSize: 18,
    color: "#F44336",
    fontWeight: "bold",
  },
  infoExtra: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoExtraLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 12,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoChave: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  infoValor: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});
