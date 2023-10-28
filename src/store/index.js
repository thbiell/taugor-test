import { create } from 'zustand'

const useStore = create((set) => ({
  user: {},
  increaseUser: (newUser) => set(() => ({ user: newUser })),
}));

export default useStore;