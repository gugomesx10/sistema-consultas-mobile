import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import styles from "../styles/login.styles";

type LoginNav = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const navigation = useNavigation<LoginNav>();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha e-mail e senha.");
      return;
    }
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  return (
    <View style={styles.container}>
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

        <TouchableOpacity style={styles.linkCadastro}>
          <Text style={styles.linkCadastroTexto}>
            Não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
