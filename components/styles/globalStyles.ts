import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 80,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  innerContainer: {
    width: "90%", 
    alignItems: "center",
  },
  logo: {
    width: 140, 
    height: 140,
    marginBottom: 10,
    marginTop: -40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 8,
    alignSelf: "center",
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    paddingLeft: 5,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  inputIcon: {
    marginRight: 10,
    color: "#888",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
    alignSelf: "flex-start",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#683AE7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20, 
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginTop: 20, 
  },
  link: {
    color: "#EAB540",
    fontWeight: "bold",
  },
});
