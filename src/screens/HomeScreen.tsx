import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { consultasIniciais } from "../data/consultasData";
import { calcularFaturamento } from "../utils/consultaFunctions";

type HomeNav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNav>();
  const faturamento = calcularFaturamento(consultasIniciais);

  const totalConsultas = consultasIniciais.length;
  const agendadas = consultasIniciais.filter((c) => c.status === "agendada").length;
  const realizadas = consultasIniciais.filter((c) => c.status === "realizada").length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Médicas</Text>
        </View>

        <View style={styles.faturamentoCard}>
          <Text style={styles.faturamentoLabel}>💰 Faturamento Total</Text>
          <Text style={styles.faturamentoValor}>
            {faturamento.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <Text style={styles.faturamentoInfo}>
            (somente consultas realizadas)
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>{totalConsultas}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>{agendadas}</Text>
            <Text style={styles.statLabel}>Agendadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>{realizadas}</Text>
            <Text style={styles.statLabel}>Realizadas</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuBotao}
          onPress={() => navigation.navigate("ConsultasList")}
        >
          <Text style={styles.menuBotaoTexto}>📋 Ver Consultas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBotao}
          onPress={() => navigation.navigate("NovaConsulta")}
        >
          <Text style={styles.menuBotaoTexto}>➕ Nova Consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBotao}
          onPress={() => navigation.navigate("MinhasConsultas")}
        >
          <Text style={styles.menuBotaoTexto}>📁 Minhas Consultas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBotao}
          onPress={() => navigation.navigate("CadastroPaciente")}
        >
          <Text style={styles.menuBotaoTexto}>👤 Cadastrar Paciente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79059C",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  faturamentoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  faturamentoLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 4,
  },
  faturamentoValor: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  faturamentoInfo: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.7,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  statNumero: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
    marginTop: 4,
  },
  menuBotao: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: "center",
  },
  menuBotaoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#79059C",
  },
});
