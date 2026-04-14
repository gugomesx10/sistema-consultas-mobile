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
  tituloContainer: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#79059C",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  erroTexto: {
    fontSize: 18,
    color: "#F44336",
    fontWeight: "bold",
  },
  infoExtra: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoExtraLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 12,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoChave: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  infoValor: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});

export default styles;
