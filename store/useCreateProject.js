import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCreateProjectStore = create(
  persist(
    (set, get) => ({
        projectName: "",
        

      showProj: false,
      username: "",
      selectMember: {
        id: 1,
        fullName: "Select",
        photoURL: "/users.png"
      },
      getProj: () => get(),
      setProj: newProj => set(newProj)
    }),
    {
      name: "CreateProject-storage"
    }
  )
)