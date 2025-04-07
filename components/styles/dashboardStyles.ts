import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    position: "relative",
  },

  // Header
  header: {
    backgroundColor: "#683AE7",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    maxWidth: "50%",
  },
  usernameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  purpleBackdrop: {
    position: "absolute",
    top: 120,
    height: height * 0.35,
    width: "100%",
    backgroundColor: "#683AE7",
    zIndex: -1,
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
  
  calendarCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
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
  
  // New container for quick menu cards
  quickMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  
  // Keep original quickCard style for compatibility
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
  
  // New style for the rectangular quick menu cards
  quickMenuCard: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: (width - 48) / 3, // Divide screen width by 3 with margins
    height: 90, // Fixed height for rectangular appearance
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  saveNoteBtn: {
    backgroundColor: "#683AE7",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  saveNoteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});