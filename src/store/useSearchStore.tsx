import { create } from "zustand"

interface IProps {
  keyword: string;
  changeKeyword: (val: string) => void;
}
const useSearchStore = create<IProps>((set) => ({
  keyword: '',
  changeKeyword: (val) => set({ keyword: val }),
}));

export default useSearchStore;