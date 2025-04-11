// components/styles/dashboardStyles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const BAR_WIDTH = 6;
const BAR_SPACING = 2;

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#683AE7",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roundedHeader: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  bigCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bigCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  bigCardText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  quickMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
  },
  quickMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickMenuCard: {
    backgroundColor: "#fff",
    width: width * 0.3 - 15,
    height: 100,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  quickCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  tipBox: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: "#333",
  },
  
  // Calendar Card
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addNoteText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#683AE7',
    marginLeft: 4,
  },
  
  // Calendar Note Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 20,
  },
  saveNoteBtn: {
    backgroundColor: "#683AE7",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  saveNoteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  // Productivity Graph
  graphCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  loadingGraph: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#999',
    fontSize: 14,
  },
  graphStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  graphStat: {
    alignItems: 'center',
  },
  graphStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#683AE7',
  },
  graphStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  graphContainer: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  graphBar: {
    width: BAR_WIDTH,
    backgroundColor: '#683AE7',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    marginHorizontal: BAR_SPACING / 2,
  },
  graphLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  graphLabel: {
    fontSize: 10,
    color: '#999',
    width: width / 5 - 20,
    textAlign: 'center',
  },
});

export default dashboardStyles;