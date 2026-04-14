import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { medicos } from "../data/consultasData";
import styles from "../styles/novaConsulta.styles";
import { useAppContext } from "../context/AppContext";

//aqui é a tela pra agendar uma consulta nova
export default function NovaConsultaScreen() {
  const navigation = useNavigation();
  const { pacientes, consultas, adicionarConsulta } = useAppContext(); //pego pacientes e consultas do contexto
  const [medicoSelecionado, setMedicoSelecionado] = useState<number | null>(null);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<number | null>(null);
  const [valor, setValor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function showAlert(titulo: string, mensagem: string, onOk?: () => void) {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n\n${mensagem}`);
      if (onOk) onOk();
    } else {
      Alert.alert(titulo, mensagem, [{ text: "OK", onPress: onOk }]);
    }
  }

  //aqui cria a consulta quando clica no botão, pega o médico e paciente selecionados
  function handleCriar() {
    if (!medicoSelecionado || !pacienteSelecionado || !valor) {
      showAlert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    const medico = medicos.find((m) => m.id === medicoSelecionado)!;
    const paciente = pacientes.find((p) => p.id === pacienteSelecionado)!;
    //monta o objeto da consulta e adiciona no contexto global
    const novaConsulta = {
      id: consultas.length + 1,
      medico,
      paciente,
      data: new Date(),
      valor: Number(valor),
      status: "agendada" as const,
      observacoes: observacoes || undefined,
    };
    adicionarConsulta(novaConsulta);
    showAlert("Sucesso", "Consulta criada com sucesso!", () =>
      navigation.goBack()
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Nova Consulta</Text>

        <Text style={styles.label}>Médico *</Text>
        {medicos.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.opcao,
              medicoSelecionado === m.id && styles.opcaoSelecionada,
            ]}
            onPress={() => setMedicoSelecionado(m.id)}
          >
            <Text
              style={[
                styles.opcaoTexto,
                medicoSelecionado === m.id && styles.opcaoTextoSelecionado,
              ]}
            >
              {m.nome} - {m.especialidade.nome}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Paciente *</Text>
        {pacientes.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.opcao,
              pacienteSelecionado === p.id && styles.opcaoSelecionada,
            ]}
            onPress={() => setPacienteSelecionado(p.id)}
          >
            <Text
              style={[
                styles.opcaoTexto,
                pacienteSelecionado === p.id && styles.opcaoTextoSelecionado,
              ]}
            >
              {p.nome} - {p.cpf}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Valor (R$) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 350"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Observações opcionais..."
          multiline
          numberOfLines={3}
          value={observacoes}
          onChangeText={setObservacoes}
        />

        <TouchableOpacity style={styles.botaoCriar} onPress={handleCriar}>
          <Text style={styles.botaoCriarTexto}>Criar Consulta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
