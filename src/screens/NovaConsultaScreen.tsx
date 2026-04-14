import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { medicos, pacientes } from "../data/consultasData";

export default function NovaConsultaScreen() {
  const navigation = useNavigation();
  const [medicoSelecionado, setMedicoSelecionado] = useState<number | null>(null);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<number | null>(null);
  const [valor, setValor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function handleCriar() {
    if (!medicoSelecionado || !pacienteSelecionado || !valor) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Consulta criada com sucesso!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
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
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  opcao: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  opcaoSelecionada: {
    borderColor: "#79059C",
    backgroundColor: "#f3e5f5",
  },
  opcaoTexto: {
    fontSize: 14,
    color: "#333",
  },
  opcaoTextoSelecionado: {
    color: "#79059C",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: "top",
  },
  botaoCriar: {
    backgroundColor: "#79059C",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  botaoCriarTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
