import {Subject} from "rxjs";

export const scrollTouchBegin = new Subject<boolean>();
export const scrollTouchEnd = new Subject<boolean>();
export const wheelEvent = new Subject<WheelEvent>();