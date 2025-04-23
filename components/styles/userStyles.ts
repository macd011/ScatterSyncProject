import { StyleSheet } from "react-native";

const userStyles = StyleSheet.create({
  // Main containers
  container: {
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 40,
    flexGrow: 1,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
    maxHeight: "90%",
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },

  // Headings and section titles
  header: {
    marginBottom: 20,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 14,
    color: "#222",
  },

  // Form Labels + Input Fields
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  disabledInput: {
    fontSize: 16,
    color: "#555",
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  arrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  flexInput: {
    flex: 1,
  },

  // Button
  saveBtn: {
    backgroundColor: "#683AE7",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Drawer
  content: {
    paddingBottom: 30,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  linkText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#444",
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
});

export default userStyles;
