import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface TicketUpdate {
  timestamp: string;
  status: string;
  note: string;
}

export interface Ticket {
  id: string;
  title_en: string;
  name: string;
  phone: string;
  category_id: string;
  ward_id: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Submitted' | 'In Progress' | 'Resolved' | 'Closed';
  created_at_iso: string;
  updates?: TicketUpdate[];
}

// Initial tickets data
const initialTickets: Ticket[] = [
  {
    id: "G-2025-0001",
    title_en: "Water Supply Issue in Ward 5",
    name: "Ram Bahadur Shrestha",
    phone: "9841234567",
    category_id: "water-supply",
    ward_id: "ward-5",
    description: "There has been no water supply for the past 3 days in our area. This is causing serious problems for daily activities and sanitation.",
    priority: "High",
    status: "Submitted",
    created_at_iso: "2024-12-15T08:30:00.000Z",
    updates: [
      {
        timestamp: "2024-12-15T08:30:00.000Z",
        status: "Submitted",
        note: "Complaint received and logged into system"
      }
    ]
  },
  {
    id: "G-2025-0002",
    title_en: "Road Repair Needed on Main Street",
    name: "Sita Devi Karki",
    phone: "9851234567",
    category_id: "infrastructure",
    ward_id: "ward-3",
    description: "The main street has multiple potholes that are dangerous for vehicles and pedestrians. Urgent repair is needed.",
    priority: "Medium",
    status: "In Progress",
    created_at_iso: "2024-12-14T14:45:00.000Z",
    updates: [
      {
        timestamp: "2024-12-14T14:45:00.000Z",
        status: "Submitted",
        note: "Complaint received and logged into system"
      },
      {
        timestamp: "2024-12-15T10:20:00.000Z",
        status: "In Progress",
        note: "Inspection team dispatched to assess the damage"
      }
    ]
  },
  {
    id: "G-2025-0003",
    title_en: "Street Light Not Working",
    name: "Hari Prasad Gautam",
    phone: "9861234567",
    category_id: "utilities",
    ward_id: "ward-7",
    description: "The street light near the community center has been off for over a week, making the area unsafe at night.",
    priority: "Low",
    status: "Resolved",
    created_at_iso: "2024-12-10T19:15:00.000Z",
    updates: [
      {
        timestamp: "2024-12-10T19:15:00.000Z",
        status: "Submitted",
        note: "Complaint received and logged into system"
      },
      {
        timestamp: "2024-12-11T09:30:00.000Z",
        status: "In Progress",
        note: "Electrical team assigned to fix the issue"
      },
      {
        timestamp: "2024-12-12T16:45:00.000Z",
        status: "Resolved",
        note: "Street light repaired and tested. Issue resolved."
      }
    ]
  },
  {
    id: "G-2025-0004",
    title_en: "Garbage Collection Delay",
    name: "Maya Tamang",
    phone: "9871234567",
    category_id: "sanitation",
    ward_id: "ward-2",
    description: "Garbage has not been collected for over a week in our neighborhood. This is creating health hazards and bad odor.",
    priority: "High",
    status: "Submitted",
    created_at_iso: "2024-12-16T07:20:00.000Z",
    updates: [
      {
        timestamp: "2024-12-16T07:20:00.000Z",
        status: "Submitted",
        note: "Complaint received and logged into system"
      }
    ]
  },
  {
    id: "G-2025-0005",
    title_en: "School Building Maintenance Required",
    name: "Krishna Bahadur Magar",
    phone: "9881234567",
    category_id: "education",
    ward_id: "ward-4",
    description: "The roof of the primary school is leaking during rain. Students and teachers are facing difficulties during monsoon.",
    priority: "Medium",
    status: "In Progress",
    created_at_iso: "2024-12-13T11:00:00.000Z",
    updates: [
      {
        timestamp: "2024-12-13T11:00:00.000Z",
        status: "Submitted",
        note: "Complaint received and logged into system"
      },
      {
        timestamp: "2024-12-14T08:15:00.000Z",
        status: "In Progress",
        note: "Education department contacted. Maintenance team scheduled for inspection."
      }
    ]
  }
];

interface TicketsState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'created_at_iso'>) => void;
  getTicketById: (id: string) => Ticket | undefined;
  setSelectedTicket: (ticket: Ticket | null) => void;
}

// Helper function to generate incremental ticket ID
const generateTicketId = (existingTickets: Ticket[]): string => {
  const currentYear = new Date().getFullYear();
  const prefix = `G-${currentYear}-`;
  
  // Find the highest existing number for the current year
  const existingNumbers = existingTickets
    .filter(ticket => ticket.id.startsWith(prefix))
    .map(ticket => {
      const match = ticket.id.match(new RegExp(`${prefix}(\\d+)`));
      return match ? parseInt(match[1]) : 0;
    });
  
  const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
};

export const useTickets = create<TicketsState>()(
  persist(
    (set, get) => ({
      tickets: initialTickets,
      selectedTicket: null,
      
      addTicket: (ticketData) => {
        const state = get();
        const newTicket: Ticket = {
          ...ticketData,
          id: generateTicketId(state.tickets),
          status: 'Submitted',
          created_at_iso: new Date().toISOString(),
          updates: [
            {
              timestamp: new Date().toISOString(),
              status: 'Submitted',
              note: 'Complaint received and logged into system'
            }
          ]
        };
        
        set((state) => ({
          tickets: [...state.tickets, newTicket],
        }));
      },
      
      getTicketById: (id) => {
        return get().tickets.find((ticket) => ticket.id === id);
      },

      setSelectedTicket: (ticket) => {
        set({ selectedTicket: ticket });
      },
    }),
    {
      name: 'grievance-tickets-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tickets: state.tickets }),
    }
  )
);
