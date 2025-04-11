// components/styles/dailyScheduleStyles.ts
import { StyleSheet } from "react-native";

export const dailyScheduleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Rounded header style
  roundedHeader: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 0, // Remove margin to close the gap
  },
  
  // Month navigation bar
  monthNavigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  currentMonthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  navButtonsContainer: {
    flexDirection: 'row',
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  weekDayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  dateCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: '#683AE7', // Match header purple color
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  currentDateText: {
    color: '#FF3B30', // Red text for current date
    fontWeight: '600',
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  timeLabel: {
    width: 60,
    paddingLeft: 10,
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  timeLabelText: {
    fontSize: 12,
    color: '#999',
  },
  eventsContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FF3B30', // Red line color
    zIndex: 10,
    // The top value will be dynamically set based on current time
  },
  eventCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4CD964', // Default green color
    borderRadius: 5,
    padding: 10,
    marginVertical: 3,
    minHeight: 50,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  eventLocation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  eventAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    marginLeft: 10,
  },
  avatarImage: {
    width: 30,
    height: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#683AE7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100,
  },
  
  // Tasks section styles
  tasksSectionContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: '90%',
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    width: "48%",
    alignItems: "center",
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#683AE7",
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});