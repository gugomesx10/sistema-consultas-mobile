import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export type Consulta = {
  id: number;
  paciente: string;
  medico: string;
  data: string;
  status: "agendada" | "confirmada" | "cancelada" | "realizada";
};

type ConsultaCardProps = {
  consulta: Consulta;
  onConfirmar: (id: number) => void;
  onCancelar: (id: number) => void;
};

const statusCores: Record<Consulta["status"], string> = {
  agendada: "gray",
  confirmada: "blue",
  realizada: "green",
  cancelada: "red",
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
}: ConsultaCardProps) {
  const podeConfirmar = consulta.status === "agendada";
  const podeCancelar =
    consulta.status === "agendada" || consulta.status === "confirmada";

  return (
    <View style={styles.card}>
      <Text>Paciente: {consulta.paciente}</Text>
      <Text>Médico: {consulta.medico}</Text>
      <Text>Data: {consulta.data}</Text>
      <Text style={{ color: statusCores[consulta.status] }}>
        Status: {consulta.status}
      </Text>

      {podeConfirmar && (
        <View style={styles.botaoContainer}>
          <Button
            title="Confirmar Consulta"
            onPress={() => onConfirmar(consulta.id)}
          />
        </View>
      )}

      {podeCancelar && (
        <View style={styles.botaoContainer}>
          <Button
            title="Cancelar Consulta"
            color="red"
            onPress={() => onCancelar(consulta.id)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "80%",
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  botaoContainer: {
    marginTop: 10,
  },
});
