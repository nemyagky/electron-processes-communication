import React, {useEffect} from 'react';
import {MovableBox} from "./components/MovableBox/movable-box";
import {ipcRenderer} from "electron";
import { Subject } from 'rxjs';


export const App: React.FC = () => {

    const scrollTouchBegin = new Subject<boolean>();
    const scrollTouchEnd = new Subject<boolean>();
    const wheelEvent = new Subject<WheelEvent>();

    useEffect(() => {
        ipcRenderer.on("scroll-touch-begin", () => {
            scrollTouchBegin.next(true);
        })

        ipcRenderer.on("scroll-touch-end", () => {
            scrollTouchEnd.next(true);
        })

        window.addEventListener('wheel', (e) => {
            wheelEvent.next(e);
        });
    }, []);


    return (
        <MovableBox
            scrollTouchBegin={scrollTouchBegin}
            scrollTouchEnd={scrollTouchEnd}
            wheelEvent={wheelEvent}
        />
    );
}