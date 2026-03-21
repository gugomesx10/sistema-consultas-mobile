import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79059C",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  // ── Filtros de Status ──────────────────────────────────────────────────────
  filtrosContainer: {
    marginBottom: 12,
  },
  filtroBotao: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: "#fff",
  },
  filtroTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  filtroTextoAtivo: {
    color: "#79059C",
  },
  contador: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 4,
  },
  // ── Faturamento ────────────────────────────────────────────────────────────
  faturamentoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  faturamentoLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 4,
  },
  faturamentoValor: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  faturamentoInfo: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.7,
  },
  // ── Lista vazia ────────────────────────────────────────────────────────────
  vazio: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
  },
  vazioTexto: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.8,
  },
});
