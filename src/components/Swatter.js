import {useEffect, useRef, useState} from 'react';
import * as PIXI from 'pixi.js';
import {Sprite} from '@pixi/react';
import GLOBALS from '../constants/constants.js'

export default function Swatter({   
    stageWidth, 
    stageHeight, 
    stageScale, 
    globalImageData,
    setBugHit,
    bugX,
    bugY,
    setSwatterStrikeX,
    setSwatterStrikeY,
    setSwatterSwiped,
    setSwatterX,
    setSwatterY
}) {
    const [initial, setInitial] = useState(true);
    const swatterData = useRef();
    const [swatterDataState, setSwatterDataState] = useState({});
    const [swatterActivated, setSwatterActivated] = useState(false);
    const [swatterMoveLocationX, setSwatterMoveLocationX] = useState(0);
    const [swatterMoveLocationY, setSwatterMoveLocationY] = useState(0);

    // Get the swatter images
    useEffect(() => {

        const imageLoader = (filename) => {
            let texture;
            try {
                texture = PIXI.Texture.from(`${process.env.PUBLIC_URL}/static/graphics/${filename}`);
                if (texture.width === 0 || texture.height === 0) {
                    console.log("Error: unable to load texture:", filename)
                }
            }
            catch (error) {
                console.error("Unable to load texture:", filename, error);
            }
            return texture;
        }
    
        if (initial && globalImageData.length) {
            swatterData.current = {};
            let found = false;
            let swatterItem = [];
            for (let item of globalImageData) {
                if (item.type === "swatter") {
                    found = true;
                    swatterItem = item.files;
                    break;
                }
            }
            if (!found) {
                console.log("Swatter images not found in prop file");
            }
            else {
                // Get the swatter textures etc.
                for (let item of swatterItem) {
                    if (item.type === "standard") {
                        swatterData.current.standard = {};
                        swatterData.current.standard.image = imageLoader(item.file);
                        swatterData.current.standard.width = item.width;
                        swatterData.current.standard.height = item.height;
                    }
                    else {
                        swatterData.current.tilted = {};
                        swatterData.current.tilted.image = imageLoader(item.file);
                        swatterData.current.tilted.width = item.width;
                        swatterData.current.tilted.height = item.height;
                    }
                }
                swatterData.current.type = "standard";
                swatterData.current.image = swatterData.current.standard.image;
                swatterData.current.x = stageWidth / 2;
                swatterData.current.y = stageHeight * 6.5/10;
            }
            setInitial(false);
            setSwatterDataState(swatterData.current);
        }
    }, [initial, globalImageData, stageWidth, stageHeight])

    // Swatter start detection
    const handleSwatterStart = () => {
        if (!swatterActivated) {
            setSwatterActivated(true);
            swatterData.current.status = "standard";
            swatterData.current.image = swatterData.current.standard.image;
            setSwatterDataState(swatterData.current);
        }
    }

    const handleSwatterMoved = (event) => {
        if (swatterActivated) {
            let x = event.data.global.x;
            let y = event.data.global.y;
            if (!(x === swatterMoveLocationX && y === swatterMoveLocationY)) {
                if (x <= 5 || x >= stageWidth - 15 || y <= 10 || y >= stageHeight - 15) {
                    if (x <= 5) {
                        x = 6;
                    }
                    else if(x >= stageWidth - 15) {
                        x = stageWidth - 16;
                    }
                    if (y <= 10) {
                        y = 11;
                    }
                    else if (y >= stageHeight - 15) {
                        y = stageHeight - 16;
                    }
                    setSwatterActivated(false);
                }
                setSwatterMoveLocationX(x);
                setSwatterMoveLocationY(y);
                swatterData.current.x = x;
                swatterData.current.y = y;
                setSwatterX(x);
                setSwatterY(y);
                setSwatterDataState(swatterData.current);
            }
        }
    }

    const handleSwatterDeactivated = () => {
        if (swatterActivated) {
            setSwatterActivated(false);
            // Set the swatter to tilted and test for bug strike
            swatterData.current.image = swatterData.current.tilted.image;
            swatterData.current.status = "tilted";
            setSwatterSwiped(true);
            setSwatterStrikeX(swatterData.current.x);
            setSwatterStrikeY(swatterData.current.y);
            setSwatterDataState(swatterData.current);
            // Check for swat
            if (bugX > swatterData.current.x - GLOBALS.bugStrikeMarginLeft && 
                bugX < swatterData.current.x + GLOBALS.bugStrikeMarginRight &&
                bugY > swatterData.current.y - GLOBALS.bugStrikeMarginTop && 
                bugY < swatterData.current.y + GLOBALS.bugStrikeMarginBottom) {
                setBugHit(true);
            }
        }
    }
    
    return (
        (!initial &&
            <Sprite
                texture={swatterDataState.image}
                anchor={{x:0.5, y: 0.2}}
                x={swatterDataState.x}
                y={swatterDataState.y}
                eventMode={'dynamic'}
                pointerdown={handleSwatterStart}
                pointermove={handleSwatterMoved}
                pointerup={handleSwatterDeactivated}
            />
        )
    )
}