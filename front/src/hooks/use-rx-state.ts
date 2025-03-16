import { useState } from "react";
import { RxState } from "@/utils/rx-state";

export function useRxState<T>(value: T): RxState<T> {
  const state = useState(value);
  return new RxState(state[0], state[1]);
}
