import React, {useEffect} from 'react';
import {MovableBox} from "./components/MovableBox/movable-box";
import {ipcRenderer} from "electron";
import {scrollTouchBeginEvent, scrollTouchEndEvent, wheelEvent} from "./services/event-subscriber.service";


export const App: React.FC = () => {

    useEffect(() => {
        ipcRenderer.on("scroll-touch-begin", () => {
            scrollTouchBeginEvent.next(true);
        })

        ipcRenderer.on("scroll-touch-end", () => {
            scrollTouchEndEvent.next(true);
        })

        window.addEventListener('wheel', (e) => {
            wheelEvent.next(e);
        });
    }, []);


    return (
        <MovableBox/>
    );
}