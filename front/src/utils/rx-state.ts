import { Dispatch, SetStateAction } from "react";

export class RxState<T> extends Array<T | Dispatch<SetStateAction<T>>> {
  0: T;
  1: Dispatch<SetStateAction<T>>;

  constructor(value: T, dispatch: Dispatch<SetStateAction<T>>) {
    super();
    this[0] = value;
    this[1] = dispatch;
  }

  get value() {
    return this[0];
  }
  get dispatch() {
    return this[1];
  }
  set value(value: T) {
    this.dispatch(value);
  }
}
