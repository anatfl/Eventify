// backend/src/models/item.ts

export interface Item {
    id: string;
    eventId: string;     // which event the item belongs to
    name: string;        // description, e.g. "Salad"
    claimedBy?: string;  // userId of who will bring it
  }
  
  // In‐memory store
  export const items = new Map<string, Item>();
  