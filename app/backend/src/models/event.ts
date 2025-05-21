// backend/src/models/event.ts
export interface Event {
    id: string;
    title: string;
    datetime: string;
    ownerId: string;        // who created it
    attendees: string[];    // user IDs
  }
  
  export const events = new Map<string, Event>();
  