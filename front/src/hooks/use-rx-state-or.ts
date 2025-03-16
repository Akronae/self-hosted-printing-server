import { RxState } from "@/utils/rx-state";
import { useRxState } from "./use-rx-state";

export function useRxStateOr<T>(
  state: RxState<T> | null | undefined,
  or: RxState<T> | T
): RxState<T> {
  const fallbackValue = useRxState(or);
  const fallback = or instanceof RxState ? or : (fallbackValue as RxState<T>);
  return state ?? fallback;
}
