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
import { medicos, pacientes } from "../data/consultasData";
import styles from "../styles/novaConsulta.styles";

export default function NovaConsultaScreen() {
  const navigation = useNavigation();
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

  function handleCriar() {
    if (!medicoSelecionado || !pacienteSelecionado || !valor) {
      showAlert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
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
