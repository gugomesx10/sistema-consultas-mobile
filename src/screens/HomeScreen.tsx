import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { consultasIniciais } from "../data/consultasData";
import { calcularFaturamento } from "../utils/consultaFunctions";
import styles from "../styles/home.styles";

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
