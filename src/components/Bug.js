import {Sprite} from '@pixi/react';
import {useState, useRef, useEffect} from 'react';
import {useApp} from '@pixi/react';
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
    const bugData = useRef();
    const activeBugData = useRef();
    const [activeBugDataState, setActiveBugDataState] = useState({});
    const bugNum = useRef();
    const [bugActive, setBugActive] = useState(false);
    const numBugs = useRef();
    const app = useApp();

    console.log("Got to Bug");

    // Set-up the bug data initially
    useEffect( () => {
        if (initial && globalImageData.length) {
            console.log("Initialise bugs", globalImageData.length)
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
                    bugData.current[i].flying.image = `${process.env.PUBLIC_URL}/static/graphics/${bugFiles[i].flying.file}`;
                    bugData.current[i].sitting.image = `${process.env.PUBLIC_URL}/static/graphics/${bugFiles[i].sitting.file}`;
                    bugData.current[i].activity = "inactive";
                }
                numBugs.current = bugData.current.length;
                console.log("Got numBugs:", numBugs.current, bugData.current.length)
                setBugStart(true);
            }
            setInitial(false);
        }
    }, [initial, globalImageData, setBugStart])

    // Set-up a new bug for activity
    useEffect(() => {
        if (bugStart) {
            // Choose a bug
            bugNum.current = Math.floor(Math.random() * numBugs.current);
            console.log("bugNum:", bugNum.current, numBugs.current);
            activeBugData.current = {};
            // Set the bug on the right of the stage
            activeBugData.current.x = stageWidth;
            activeBugData.current.y = Math.floor(Math.random() * (stageHeight - 20)) + 10;
            // Set the image data
            activeBugData.current.image = bugData.current[bugNum.current].flying.image;
            // Set the initial speed parameters (pixels per tick)
            activeBugData.current.vx = -(Math.floor(Math.random() * (GLOBALS.maxSpeed - 1)) + 1);
            activeBugData.current.vy = Math.floor(Math.random() * (GLOBALS.maxSpeed - 1) + 1);
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
            activeBugData.status = "flying";
            // Time allocation
            activeBugData.startTime = Date.now();
            activeBugData.timeAllowance = Math.floor(Math.random() * 0.5) * GLOBALS.maxBugTime + 0.5 * GLOBALS.maxBugTime;
            setBugStart(false);
            setActiveBugDataState(activeBugData.current);
            setBugActive(true);
        }

    }, [bugStart, stageWidth, stageHeight, setBugStart])

    // Handle the active state of the current bug
    useEffect(() => {
        const moveBug = () => {
            let bug = activeBugData.current;
            // Adjust position
            bug.x = bug.x + bug.vx;
            bug.y = bug.y + bug.vy;
            // Update the state
            setActiveBugDataState(activeBugData.current);
            // Check the time limit
            let t = Date.now();
            if (t - bug.startTime >= bug.timeAllowance) {
                setBugActive(false);
            }

        };

        if (bugActive) {
            app.ticker.add(moveBug);
        }

        // Cleanup on unmount
        return () => {
            if (app && app.ticker) {
                app.ticker.remove(moveBug);
            }
        };

    
    }, [bugActive, app])

    return (
        <>
        { bugActive && (
            <Sprite
                image={activeBugDataState.image}
                scale={{x: activeBugDataState.scaleX, y:activeBugDataState.scaleY}}
                anchor={{x:0.5, y:0.5}}
                x={activeBugDataState.x}
                y={activeBugDataState.y}
            />
        )}
        </>
    )
}
