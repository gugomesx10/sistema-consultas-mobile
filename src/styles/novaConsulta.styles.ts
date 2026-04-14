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

export default styles;
