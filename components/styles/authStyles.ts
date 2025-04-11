import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  inputContainer: {
    width: "90%",
    marginTop: 10,
  },
  button: {
    width: "90%",
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
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  linkText: {
    color: "#EAB540",
    fontWeight: "bold",
  },
});
