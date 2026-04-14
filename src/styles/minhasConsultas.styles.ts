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
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  consultaItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  consultaMedico: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTexto: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  consultaEspecialidade: {
    fontSize: 14,
    color: "#79059C",
    marginBottom: 8,
  },
  consultaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  consultaData: {
    fontSize: 14,
    color: "#666",
  },
  consultaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  vazio: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
  },
  vazioTexto: {
    color: "#999",
    fontSize: 16,
  },
});

export default styles;
