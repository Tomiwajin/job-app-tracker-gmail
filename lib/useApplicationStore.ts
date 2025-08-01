import { create } from "zustand";

export type JobStatus =
  | "applied"
  | "rejected"
  | "interview"
  | "next-phase"
  | "offer"
  | "withdrawn";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  email: string;
  date: Date;
  subject: string;
}

interface ApplicationStore {
  applications: JobApplication[];
  setApplications: (apps: JobApplication[]) => void;
  addApplications: (apps: JobApplication[]) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  setApplications: (apps) => set({ applications: apps }),
  addApplications: (newApps) =>
    set((state) => {
      const existingIds = new Set(state.applications.map((a) => a.id));
      const deduped = newApps.filter((a) => !existingIds.has(a.id));
      return { applications: [...state.applications, ...deduped] };
    }),
}));
