import { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { CalendarEvent, MarkedDates } from "../components/models/calendar.types";

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events for the user
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        setEvents([]);
        setMarkedDates({});
        setLoading(false);
        return;
      }

      const eventsRef = collection(firestore, "users", user.uid, "events");
      const snapshot = await getDocs(eventsRef);
      
      const fetchedEvents: CalendarEvent[] = [];
      const marked: MarkedDates = {};

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const event: CalendarEvent = {
          id: docSnap.id,
          title: data.title,
          description: data.description || "",
          location: data.location || "",
          startDate: data.startDate,
          endDate: data.endDate,
          allDay: data.allDay || false,
          color: data.color || "#683AE7",
        };

        fetchedEvents.push(event);

        // Format date for marking
        const dateString = event.startDate.toDate().toISOString().split("T")[0];
        
        // Style similar to the example image - light fill with small dot
        marked[dateString] = {
          // Use a light tint of the event color with some opacity
          selected: true,
          selectedColor: `${event.color}20`, // 20 is hex for 12% opacity
          marked: true,
          dotColor: event.color || "#683AE7",
        };
      });

      setEvents(fetchedEvents);
      setMarkedDates(marked);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchEvents();
  }, []);

  // Add a new event
  const addEvent = async (eventData: Omit<CalendarEvent, "id">) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      await addDoc(collection(firestore, "users", user.uid, "events"), {
        ...eventData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await fetchEvents();
      return true;
    } catch (err) {
      console.error("Error adding event:", err);
      setError("Failed to add event");
      return false;
    }
  };

  // Update an event
  const updateEvent = async (id: string, eventData: Partial<CalendarEvent>) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const eventRef = doc(firestore, "users", user.uid, "events", id);
      await updateDoc(eventRef, {
        ...eventData,
        updatedAt: serverTimestamp(),
      });

      await fetchEvents();
      return true;
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Failed to update event");
      return false;
    }
  };

  // Delete an event
  const deleteEvent = async (id: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const eventRef = doc(firestore, "users", user.uid, "events", id);
      await deleteDoc(eventRef);

      await fetchEvents();
      return true;
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event");
      return false;
    }
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    const targetDay = new Date(date);
    targetDay.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDay);
    nextDay.setDate(nextDay.getDate() + 1);
    
    return events.filter((event) => {
      const startDate = event.startDate.toDate();
      return startDate >= targetDay && startDate < nextDay;
    });
  };

  return {
    events,
    markedDates,
    loading,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDay,
  };
};