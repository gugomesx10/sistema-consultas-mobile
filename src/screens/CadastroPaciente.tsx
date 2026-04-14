import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/cadastroPaciente.styles";

export default function CadastroPaciente() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function handleCadastrar() {
    if (!nome || !cpf || !email) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Paciente cadastrado com sucesso!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Cadastro de Paciente</Text>
        <Text style={styles.descricao}>
          Preencha os dados do novo paciente
        </Text>

        <Text style={styles.label}>Nome Completo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do paciente"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>CPF *</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />

        <Text style={styles.label}>E-mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="paciente@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={handleCadastrar}
        >
          <Text style={styles.botaoCadastrarTexto}>Cadastrar Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
