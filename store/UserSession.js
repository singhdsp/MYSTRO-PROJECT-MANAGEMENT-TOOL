import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSession = create(
  persist(
    (set, get) => ({
      data: null,
      setData: (data) => {
        set({ data });
      },
      getData: () => {
        return get().data;
      },
    }),
    {
      name: "session-storage",
      getStorage: () => localStorage,
    }
  )
);
