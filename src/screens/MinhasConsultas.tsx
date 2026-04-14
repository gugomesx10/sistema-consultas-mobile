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
import { consultasIniciais, paciente1 } from "../data/consultasData";
import styles from "../styles/minhasConsultas.styles";

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
