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
  filtrosContainer: {
    marginBottom: 12,
  },
  filtroBotao: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: "#79059C",
  },
  filtroTexto: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  filtroTextoAtivo: {
    color: "#fff",
  },
  contador: {
    color: "#666",
    fontSize: 13,
    marginBottom: 12,
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
  consultaPaciente: {
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
  consultaInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  consultaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginTop: 4,
  },
  acoesRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  botaoConfirmar: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  botaoCancelar: {
    backgroundColor: "#F44336",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
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
