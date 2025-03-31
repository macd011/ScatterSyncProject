import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  // Compact Header (Original)
  header: {
    backgroundColor: "#683AE7",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helloText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  usernameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  scrollContent: {
    paddingVertical: 20,
    gap: 20,
  },

  bigCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  bigCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  bigCardText: {
    fontSize: 14,
    color: "#555",
  },

  // Calendar Card
  calendarCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarText: {
    fontSize: 16,
    color: "#aaa",
  },

  quickMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  quickCard: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 120,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  quickCardText: {
    fontSize: 14,
    marginTop: 8,
    color: "#333",
    fontWeight: "600",
  },

  tipBox: {
    backgroundColor: "#e3dcfc",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#683AE7",
  },
  tipText: {
    fontSize: 14,
    color: "#555",
  },
});
