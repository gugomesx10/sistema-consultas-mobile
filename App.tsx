import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/types";
import HomeScreen from "./src/screens/HomeScreen";
import ConsultasListScreen from "./src/screens/ConsultasListScreen";
import ConsultaDetalhesScreen from "./src/screens/ConsultaDetalhesScreen";
import NovaConsultaScreen from "./src/screens/NovaConsultaScreen";
import Login from "./src/screens/Login";
import CadastroPaciente from "./src/screens/CadastroPaciente";
import MinhasConsultas from "./src/screens/MinhasConsultas";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#79059C" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Início", headerBackVisible: false }}
        />
        <Stack.Screen
          name="ConsultasList"
          component={ConsultasListScreen}
          options={{ title: "Consultas" }}
        />
        <Stack.Screen
          name="ConsultaDetalhes"
          component={ConsultaDetalhesScreen}
          options={{ title: "Detalhes" }}
        />
        <Stack.Screen
          name="NovaConsulta"
          component={NovaConsultaScreen}
          options={{ title: "Nova Consulta" }}
        />
        <Stack.Screen
          name="CadastroPaciente"
          component={CadastroPaciente}
          options={{ title: "Cadastrar Paciente" }}
        />
        <Stack.Screen
          name="MinhasConsultas"
          component={MinhasConsultas}
          options={{ title: "Minhas Consultas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
