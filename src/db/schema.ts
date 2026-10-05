export interface Entry {
  id: string;
  name: string | null;
  message: string;
  echoes: number;
  createdAt: Date;
}
