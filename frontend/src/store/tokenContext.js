import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useTokenStore = create(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set((state) => ({
                profile
            })),
            logOut: () => set((state) => ({
                profile: null,
                token: localStorage.removeItem('token'),
            })),
        }),
        {
            name: 'auth',
        }
    )
);
