export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  term: number;
  totalWeb: number;
  totalVisit: number;
  storage: number;
  backup: Backup;
}

export enum Backup {
  "weekly",
  "daily",
}
