import { RxState } from "@/utils/rx-state";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const TOKEN_LOADING = "<loading>";
const tokenAtom = atomWithStorage<string | undefined>(
  "token",
  undefined,
  undefined,
  { getOnInit: true }
);
export function useToken() {
  const [val, set] = useAtom(tokenAtom, {});
  const token = new RxState(val == TOKEN_LOADING ? undefined : val, set);
  return { token };
}
