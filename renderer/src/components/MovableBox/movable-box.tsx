import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Subject} from "rxjs";

interface MovableBoxProps {
    scrollTouchBegin: Subject<boolean>;
    scrollTouchEnd: Subject<boolean>;
    wheelEvent: Subject<WheelEvent>;
}

const defaultX = window.innerWidth/2 - 50;
const defaultY = window.innerHeight/2 - 50;

export const MovableBox: React.FC<MovableBoxProps> = (props: MovableBoxProps) => {

    const [positionX, setPositionX] = useState(defaultX);
    const [positionY, setPositionY] = useState(defaultY);
    const [isWheeling, setIsWheeling] = useState(false);

    useEffect(() => {
        props.scrollTouchBegin.subscribe(() => {
            setIsWheeling(true);
        });

        props.scrollTouchEnd.subscribe(() => {
            setPositionX(defaultX);
            setPositionY(defaultY);
            setIsWheeling(false);
        });

        return () => {
            props.scrollTouchBegin.unsubscribe();
            props.scrollTouchEnd.unsubscribe();
        }
    }, []);

    useEffect(() => {
        props.wheelEvent.subscribe((e) => {
            if (!isWheeling) return;

            setPositionX((x) => calcPositionX(x - e.deltaX));
            setPositionY((y) => calcPositionY(y - e.deltaY));
        });

        return () => {
            props.wheelEvent.observers.forEach((obs) => {
                obs.complete();
            })
        }
    }, [isWheeling]);


    const calcPositionX = (x: number) => {
        if (x < 0) return 0;
        if (x + 100 > window.innerWidth) return window.innerWidth - 100;

        return x;
    }

    const calcPositionY = (y: number) => {
        if (y < 0) return 0;
        if (y + 100 > window.innerHeight) return window.innerHeight - 100;

        return y;
    }

    return (
        <Box style={{
            left: positionX + 'px',
            top: positionY + 'px',
            background: isWheeling ? "rgb(230, 59, 52)" : "#FFF",
            transition: isWheeling ?
                'background-color 0.3s' :
                'background-color 0.3s, left 0.3s, top 0.3s'
        }}/>
    )
}

export const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  position: absolute;
`;