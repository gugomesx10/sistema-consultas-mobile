import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { useAppContext } from "../context/AppContext";
import { ConsultaCard } from "../components";
import styles from "../styles/consultaDetalhes.styles";

type DetalhesRoute = RouteProp<RootStackParamList, "ConsultaDetalhes">;

//aqui é a tela de detalhes, mostra todas as informações de uma consulta específica
export default function ConsultaDetalhesScreen() {
  const route = useRoute<DetalhesRoute>();
  const { consultaId } = route.params; //pega o id que veio da tela anterior
  const { consultas } = useAppContext();

  const consulta = consultas.find((c) => c.id === consultaId); //busca a consulta pelo id

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
