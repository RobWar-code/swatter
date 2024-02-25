import {Sprite} from '@pixi/react';
import {useState, useRef, useEffect} from 'react';
import {useApp} from '@pixi/react';
import * as PIXI from 'pixi.js';
import GLOBALS from '../constants/constants';

export default function Bug({
    stageWidth,
    stageHeight,
    stageScale,
    bugStart,
    setBugStart,
    globalImageData
}) {
    const [initial, setInitial] = useState(true);
    const [counter, setCounter] = useState(0);
    const bugData = useRef();
    const activeBugData = useRef();
    const [activeBugDataState, setActiveBugDataState] = useState({});
    const bugNum = useRef();
    const [bugActive, setBugActive] = useState(false);
    const numBugs = useRef();
    const app = useApp();

    const imageNameFromFile = (filename) => {
        let p = filename.indexOf('.');
        let f = filename.substring(0,p - 1);
        f = f.replace("-", "_");
        return f;
    }
    // Set-up the bug data initially
    useEffect( () => {
        if (initial && globalImageData.length) {
            // Search for the bug information in the graphic data
            let gotBugs = false;
            let bugIndex = 0;
            for (let i = 0; i < globalImageData.length; i++) {
                if (globalImageData[i].type === "bugs") {
                    gotBugs = true;
                    bugIndex = i;
                    break;
                }
            }
            if (gotBugs) {
                const bugs = globalImageData[bugIndex];
                let bugFiles = bugs.files;
                bugData.current = [];
                for (let i = 0; i < bugFiles.length; i++) {
                    bugData.current.push(bugFiles[i]);
                    let texture = PIXI.Texture.from(`/static/graphics/${bugFiles[i].flying.file}`);
                    bugData.current[i].flying.image = texture;
                    /*
                    let imageName = imageNameFromFile(bugFiles[i].flying.file);
                    if (!PIXI.loader.resources[imageName]) {
                        PIXI.loader.add(imageName, `${process.env.PUBLIC_URL}/static/graphic/${bugFiles[i].flying.file}`);
                        bugData.current[i].flying.image = PIXI.loader.resources[imageName].texture;
                    }
                    imageName = imageNameFromFile(bugFiles[i].sitting.file);
                    if (!PIXI.loader.resources[imageName]) {
                        PIXI.loader.add(imageName, `${process.env.PUBLIC_URL}/static/graphic/${bugFiles[i].stting.file}`);
                        bugData.current[i].flying.image = PIXI.loader.resources[imageName].texture;
                    }
                    */
                }
                numBugs.current = bugData.current.length;
                setBugStart(true);
            }
            setInitial(false);
        }
    }, [initial, globalImageData, setBugStart, app])

    // Set-up a new bug for activity
    useEffect(() => {
        if (bugStart) {
            // Choose a bug
            bugNum.current = Math.floor(Math.random() * numBugs.current);
            activeBugData.current = {};
            // Set the bug on the right of the stage
            activeBugData.current.x = stageWidth;
            activeBugData.current.y = Math.floor(Math.random() * (stageHeight - 20)) + 10;
            // Set the image data
            activeBugData.current.image = bugData.current[bugNum.current].flying.image;
            // Set the initial speed parameters (pixels per tick)
            activeBugData.current.vx = -(Math.random() * (GLOBALS.maxSpeed * 0.5) + GLOBALS.maxSpeed * 0.5);
            activeBugData.current.vy = Math.random() * (GLOBALS.maxSpeed * 0.5) + GLOBALS.maxSpeed;
            if (Math.random() > 0.5) activeBugData.current.vy *= -1;
            // Set the orientation
            if ((activeBugData.current.vx < 0 && bugData.current[bugNum.current].flying.orientation === "rightward") ||
                (activeBugData.current.vx > 0 && bugData.current[bugNum.current].flying.orientation === "leftward")) {
                activeBugData.current.scaleX = -1;
            }
            else {
                activeBugData.current.scaleX = 1;
            }
            activeBugData.current.scaleY = 1;
            // Accelleration
            activeBugData.current.ax = 0;
            activeBugData.current.ay = 0;
            // Orientation
            // Status
            activeBugData.current.status = "flying";
            // Time allocation
            activeBugData.current.numBugSteps = Math.floor(Math.random() * 0.5) * GLOBALS.maxBugSteps + 0.5 * GLOBALS.maxBugSteps;
            setBugStart(false);
            setActiveBugDataState(activeBugData.current);
            console.log("activeBugDataState:", activeBugData);
            setBugActive(true);
        }

    }, [bugStart, stageWidth, stageHeight, setBugStart])

    // Handle the active state of the current bug
    useEffect(() => {
        const moveBug = () => {
            if (bugActive) {
                // Adjust position
                activeBugData.current.x = activeBugData.current.x + activeBugData.current.vx;
                activeBugData.current.y = activeBugData.current.y + activeBugData.current.vy;
                if (activeBugData.current.x < 0 || activeBugData.current >= stageWidth) {
                    activeBugData.current.vx = -activeBugData.current.vx;
                }
                if (activeBugData.current.y < 0 || activeBugData.current.y >= stageHeight) {
                    activeBugData.current.vy = -activeBugData.current.vy;
                }
                // Update the state
                setActiveBugDataState(activeBugData.current);
                let c = counter + 1; 
                setCounter(c);
                if (c > activeBugData.current.numBugSteps) {
                    setBugActive(false);
                }
            }
        };

        if (bugActive) {
            app.ticker.add(moveBug);
        }
        else {
            app.ticker.remove(moveBug);
        }

        // Cleanup on unmount
        return () => {
            if (app && app.ticker) {
                app.ticker.remove(moveBug);
            }
        };

    
    }, [bugActive, counter, stageWidth, stageHeight, app])

    return (
        <>
        { bugActive && (
            <Sprite
                texture={activeBugDataState.image}
                scale={{x: activeBugDataState.scaleX, y:activeBugDataState.scaleY}}
                anchor={{x:0.5, y:0.5}}
                x={activeBugDataState.x}
                y={activeBugDataState.y}
            />
        )}
        </>
    )
}
