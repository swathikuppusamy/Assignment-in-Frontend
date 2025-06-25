export const sampleEvents = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2025-06-24",
    time: "10:00",
    duration: 60,
    description: "Weekly team sync to discuss project progress",
    location: "CC 8",
    attendees: ["Swathi", "Swetha", "Tharani"],
    priority: "high",
    category: "meeting",
    color: "blue",
    calendar: "work"
  },
  {
    id: 2,
    title: "Project Review",
    date: "2025-06-24",
    time: "14:00",
    duration: 90,
    description: "Q2 project review meeting with stakeholders",
    location: "Main Hall",
    attendees: ["Tamil", "Vishnu"],
    priority: "high",
    category: "review",
    color: "red",
    calendar: "work"
  },
  {
    id: 3,
    title: "Lunch with Boyfriend",
    date: "2025-06-25",
    time: "12:30",
    duration: 60,
    description: "Catch up lunch",
    location: "Downtown Cafe",
    priority: "medium",
    category: "personal",
    color: "green",
    calendar: "personal"
  },
  {
    id: 4,
    title: "Sister's Birthday",
    date: "2025-06-26",
    time: "00:00",
    duration: 1440,
    description: "All day celebration",
    priority: "high",
    category: "birthday",
    color: "purple",
    calendar: "family",
    allDay: true
  }
];

export const defaultCalendars = [
  { id: 'personal', name: 'Personal', color: 'bg-blue-500', enabled: true, count: 3 },
  { id: 'work', name: 'Work', color: 'bg-red-500', enabled: true, count: 5 },
  { id: 'family', name: 'Family', color: 'bg-green-500', enabled: true, count: 2 },
  { id: 'birthdays', name: 'Birthdays', color: 'bg-purple-500', enabled: true, count: 1 },
  { id: 'holidays', name: 'Holidays', color: 'bg-orange-500', enabled: false, count: 0 }
];