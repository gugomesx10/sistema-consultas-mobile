import { StyleSheet } from "react-native";

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
    marginBottom: 8,
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  botaoCadastrar: {
    backgroundColor: "#79059C",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  botaoCadastrarTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  botaoVoltar: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#79059C",
  },
  botaoVoltarTexto: {
    color: "#79059C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
