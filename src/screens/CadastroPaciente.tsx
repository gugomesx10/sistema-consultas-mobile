import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/cadastroPaciente.styles";
import { useAppContext } from "../context/AppContext";

//aqui é a tela de cadastro de paciente
export default function CadastroPaciente() {
  const navigation = useNavigation();
  const { pacientes, adicionarPaciente } = useAppContext(); //pego a lista e a função pra adicionar
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  //essa função trata o alert pra funcionar tanto no celular quanto na web
  function showAlert(titulo: string, mensagem: string, onOk?: () => void) {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n\n${mensagem}`);
      if (onOk) onOk();
    } else {
      Alert.alert(titulo, mensagem, [{ text: "OK", onPress: onOk }]);
    }
  }

  //aqui é quando clica em cadastrar, valida os campos e salva o paciente no contexto
  function handleCadastrar() {
    if (!nome || !cpf || !email || !senha) {
      showAlert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    if (senha !== confirmarSenha) {
      showAlert("Erro", "As senhas não coincidem."); //verifica se as senhas batem
      return;
    }
    //cria o objeto do paciente novo e adiciona no contexto global
    const novoPaciente = {
      id: pacientes.length + 1,
      nome,
      cpf,
      email,
      telefone: telefone || undefined,
    };
    adicionarPaciente(novoPaciente);
    showAlert("Sucesso", "Cadastro realizado com sucesso!\nFaça login para continuar.", () =>
      navigation.goBack()
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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

        <Text style={styles.label}>Senha *</Text>
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Confirmar Senha *</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
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
    </KeyboardAvoidingView>
  );
}
