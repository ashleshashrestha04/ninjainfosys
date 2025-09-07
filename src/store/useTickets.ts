import { create } from 'zustand';

export interface Ticket {
  id: string;
  fullName: string;
  phoneNumber: string;
  ward: string;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

interface TicketsState {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  removeTicket: (id: string) => void;
  getTicketById: (id: string) => Ticket | undefined;
}

export const useTickets = create<TicketsState>((set, get) => ({
  tickets: [],
  
  addTicket: (ticketData) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      tickets: [...state.tickets, newTicket],
    }));
  },
  
  updateTicket: (id, updates) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket
      ),
    }));
  },
  
  removeTicket: (id) => {
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
    }));
  },
  
  getTicketById: (id) => {
    return get().tickets.find((ticket) => ticket.id === id);
  },
}));
