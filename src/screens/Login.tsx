import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import styles from "../styles/login.styles";
import { useAppContext } from "../context/AppContext";

type LoginNav = NativeStackNavigationProp<RootStackParamList, "Login">;

//aqui é a tela de login do app
export default function Login() {
  const navigation = useNavigation<LoginNav>();
  const { pacientes, setPacienteLogado } = useAppContext(); //pego a lista de pacientes e a função pra setar quem logou
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //aqui é a função que roda quando clica em "Entrar"
  function handleLogin() {
    if (!email || !senha) {
      //verifica se tá na web pra usar window.alert, porque o Alert.alert do React Native não funciona no navegador
      if (Platform.OS === "web") {
        window.alert("Erro\n\nPreencha e-mail e senha.");
      } else {
        Alert.alert("Erro", "Preencha e-mail e senha.");
      }
      return;
    }
    //procura o paciente pelo email que digitou
    const paciente = pacientes.find((p) => p.email === email);
    if (paciente) {
      setPacienteLogado(paciente); //salva quem logou no contexto global
    }
    navigation.reset({ index: 0, routes: [{ name: "Home" }] }); //vai pra Home e limpa o histórico
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
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🏥</Text>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Faça login para continuar</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
            <Text style={styles.botaoLoginTexto}>Entrar</Text>
          </TouchableOpacity>

          //botão pra ir pra tela de cadastro caso a pessoa não tenha conta
          <TouchableOpacity
            style={styles.linkCadastro}
            onPress={() => navigation.navigate("CadastroPaciente")}
          >
            <Text style={styles.linkCadastroTexto}>
              Não tem conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
