import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const evmStore = (set) => ({
    evmId: localStorage.getItem("evmId") || null,
    setEvmId: (id) => {
        localStorage.setItem("evmId", id);
        set({ evmId: id });
    },

    clearStore: () => {
        localStorage.removeItem("evmId"); 
        set({ evmId: null }); 
    }
});

export const useEvmStore = create(persist(devtools(evmStore), { name: "evmStore" }));