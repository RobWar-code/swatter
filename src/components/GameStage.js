import {useState, useRef, useEffect} from 'react';
import * as PIXI from 'pixi.js';
import alcove from '../assets/images/alcove.png';
import Ornaments from './Ornaments';

export default function GameStage(
    {
        stageWidth,
        stageHeight,
        stageScale
    }
) {
    const [ornamentData, setOrnamentData] = useState([]);
    const alcoveRef = useRef(null);
    const pixiAppRef = useRef(null);

    // Set-up the PIXI app interface
    useEffect(() => {
        pixiAppRef.current = new PIXI.Application({
            width: stageWidth,
            height: stageHeight,
        });
        if (alcoveRef.current) {
            alcoveRef.current.appendChild(pixiAppRef.current.view);
        }
        
        const alcoveSprite = PIXI.Sprite.from(alcove);
        alcoveSprite.anchor = {x: 0, y: 0};
        alcoveSprite.scale = {x: stageScale, y: stageScale};
        alcoveSprite.x = 0;
        alcoveSprite.y = 0;

        pixiAppRef.current.stage.addChild(alcoveSprite);

        return () => {
            // Cleanup
            pixiAppRef.current.destroy(true, true);
        };
      
    }, [stageWidth, stageHeight, stageScale, alcoveRef])

    return (
        <div ref={alcoveRef} />
    )
}

/*
const StagePixiApp = (stageWidth, stageHeight, stageScale, alcoveRef) => {

    // Set-up the PIXI app interface
    useEffect(() => {
        const pixiAppRef = useRef(null);
        pixiAppRef.current = new PIXI.Application({
            width: stageWidth,
            height: stageHeight,
        });
        alcoveRef.current.appendChild(pixiAppRef.current.view);
        
        const alcoveSprite = PIXI.Sprite.from(alcove);
        alcoveSprite.anchor = {x: 0, y: 0};
        alcoveSprite.scale = {x: stageScale, y: stageScale};
        alcoveSprite.x = 0;
        alcoveSprite.y = 0;

        pixiAppRef.current.stage.addChild(alcoveSprite);

        return () => {
            // Cleanup
            pixiAppRef.current.destroy(true, true);
        };
      
    }, [stageWidth, stageHeight, stageScale, alcoveRef])

    return alcoveRef;
}
*/