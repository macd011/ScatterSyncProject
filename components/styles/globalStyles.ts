import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 142,
    height: 142,
    marginBottom: 10,
    marginTop: -50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    width: "85%",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
    paddingLeft: 5,
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    marginRight: 10,
    color: "#888",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "85%",
    height: 50,
    backgroundColor: "#683AE7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginTop: 15,
  },
  link: {
    color: "#EAB540",
    fontWeight: "bold",
  },
});
