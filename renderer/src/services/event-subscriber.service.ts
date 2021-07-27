import {Subject} from "rxjs";

export const scrollTouchBeginEvent = new Subject<boolean>();
export const scrollTouchEndEvent = new Subject<boolean>();
export const wheelEvent = new Subject<WheelEvent>();