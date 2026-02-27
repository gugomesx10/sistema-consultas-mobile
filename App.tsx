import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import ConsultaCard, { Consulta } from "./ConsultaCard";

export default function App() {
  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      id: 1,
      paciente: "Gustavo Gomes Martins",
      medico: "Dr. Luciano",
      data: "28/02/2026",
      status: "agendada",
    },
    {
      id: 2,
      paciente: "Giselen Rodrigues",
      medico: "Dra. Camila",
      data: "01/03/2026",
      status: "confirmada",
    },
    {
      id: 3,
      paciente: "Omar Junqueira",
      medico: "Dr. Renato",
      data: "22/02/2026",
      status: "realizada",
    },
    {
      id: 4,
      paciente: "Cecilia",
      medico: "Dra. Fernanda",
      data: "25/02/2026",
      status: "cancelada",
    },
  ]);

  function confirmarConsulta(id: number) {
    setConsultas((estadoAnterior) =>
      estadoAnterior.map((consulta) =>
        consulta.id === id ? { ...consulta, status: "confirmada" } : consulta
      )
    );
  }

  function cancelarConsulta(id: number) {
    setConsultas((estadoAnterior) =>
      estadoAnterior.map((consulta) =>
        consulta.id === id ? { ...consulta, status: "cancelada" } : consulta
      )
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.titulo}>Sistema de Consultas</Text>

      {consultas.map((consulta) => (
        <ConsultaCard
          key={consulta.id}
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});