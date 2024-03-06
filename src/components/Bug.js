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
    bugCount,
    setBugCount,
    globalImageData,
    setBugX,
    setBugY,
    setRequestBugSitting,
    sittingDue,
    setSittingDue,
    bugHitScored,
    setBugHitScored,
    swatterX,
    swatterY
}) {
    const [initial, setInitial] = useState(true);
    const [counter, setCounter] = useState(0);
    const bugData = useRef();
    const activeBugData = useRef();
    const [activeBugDataState, setActiveBugDataState] = useState({});
    const bugNum = useRef();
    const [bugActive, setBugActive] = useState(false);
    const numBugs = useRef();
    const landingSites = useRef();
    const landingSiteRef = useRef();
    const app = useApp();

    const imageNameFromFile = (filename) => {
        let p = filename.indexOf('.');
        let f = filename.substring(0,p - 1);
        f = f.replace("-", "_");
        return f;
    }

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

    // Set-up the bug data and stage landing sites initially
    useEffect( () => {
        const setupBugData = () => {
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
                    const texture1 = imageLoader(bugFiles[i].flying.file);
                    bugData.current[i].flying.image = texture1;
                    const texture2 = imageLoader(bugFiles[i].sitting.file);
                    bugData.current[i].sitting.image = texture2;
                }
                numBugs.current = bugData.current.length;
                setBugStart(true);
            }
        }

        const setupLandingSites = () => {
            // Search the image property data
            let found = false;
            for (let item of globalImageData) {
                if (item.type === "stage") {
                    landingSites.current = item.landingSites;
                    found = true;
                }
            }
            if (!found) {
                console.log("prop-files data does not contain landing sites");
            }
            else { 
                // Scale the dimensions and positions
                for (let site of landingSites.current) {
                    site.x = site.x * stageScale;
                    site.y = site.y * stageScale;
                    site.width = site.width * stageScale;
                    site.height = site.height * stageScale;
                }
            }
        }

        if (initial && globalImageData.length) {
            setupBugData();
            setupLandingSites();
            setInitial(false);
        }
    }, [initial, stageScale, globalImageData, setBugStart, app])

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
            activeBugData.current.defaultOrientation = bugData.current[bugNum.current].flying.orientation;
            // Accelleration
            activeBugData.current.ax = 0;
            activeBugData.current.ay = 0;
            // Stepped motion changes
            activeBugData.current.lastMotionChangeStep = 0;
            // Orientation
            // Status
            activeBugData.current.status = "flying";
            // Time allocation
            activeBugData.current.numBugSteps = Math.floor(Math.random() * 0.5) * GLOBALS.maxBugSteps + 0.5 * GLOBALS.maxBugSteps;
            setBugStart(false);
            setActiveBugDataState(activeBugData.current);
            setBugActive(true);
            setCounter(0);
        }

    }, [bugStart, stageWidth, stageHeight, setBugStart])

    // Handle the active state of the current bug
    useEffect(() => {
        const doChangesToMotion = () => {
            // Check the position of the bug relative to the swatter
            let dx = swatterX - activeBugData.current.x;
            let dy = swatterY - activeBugData.current.y;
            let d = Math.sqrt(dx ** 2 + dy ** 2);
            if (d < GLOBALS.bugReactionDistance) {
                if (dx < 0 && activeBugData.current.ax < 0) {
                    activeBugData.current.ax = GLOBALS.maxAcceleration;
                }
                else if (dx > 0 && activeBugData.current.ax > 0) {
                    activeBugData.current.ax = -GLOBALS.maxAcceleration;
                }
                if (dy < 0 && activeBugData.current.ay < 0) {
                    activeBugData.current.ay = GLOBALS.maxAcceleration;
                } 
                else if (dy > 0 && activeBugData.current.ay > 0) {
                    activeBugData.current.ay = -GLOBALS.maxAcceleration;
                }
            }
            else if (counter - activeBugData.current.lastMotionChangeStep > GLOBALS.motionChangeSteps && Math.random() > 0.1) {
                let deltax = GLOBALS.maxAccelerationChange * 0.2 + Math.random() * (GLOBALS.maxAccelerationChange * 0.8);
                if (activeBugData.current.x > stageWidth || activeBugData.current.x < 0) {
                    deltax = 0;
                }
                else if (activeBugData.current.ax < 0 && Math.random() > 0.97) {
                    deltax = -deltax;
                }
                else if (Math.random() < 0.5) {
                    deltax = -deltax;
                }

                if (deltax + activeBugData.current.ax < GLOBALS.maxAcceleration && 
                    deltax + activeBugData.current.ax > -GLOBALS.maxAcceleration) {
                    activeBugData.current.ax += deltax;
                    activeBugData.current.lastMotionChangeStep = counter;
                }

                let deltay = GLOBALS.maxAccelerationChange * 0.2 + Math.random() * (GLOBALS.maxAccelerationChange * 0.8);
                if (activeBugData.current.y < 0 || activeBugData.current.y > stageHeight) {
                    deltay = 0;
                }
                else if (activeBugData.current.y > stageHeight * 0.68 && Math.random() < 0.8) {
                    deltay = -deltay;
                }
                else if (Math.random() > 0.8) {
                    deltay = -deltay;
                }

                if (deltay + activeBugData.current.ay < GLOBALS.maxAcceleration && 
                    deltay + activeBugData.current.ay > -GLOBALS.maxAcceleration) {
                    activeBugData.current.ay += deltay;
                    activeBugData.current.lastMotionChangeStep = counter;
                }
            }
        }

        const performMotion = () => {
            // Adjust velocity
            activeBugData.current.vx += activeBugData.current.ax;
            if (activeBugData.current.vx > GLOBALS.maxSpeed) {
                activeBugData.current.vx = GLOBALS.maxSpeed;
                activeBugData.current.ax = 0;
            }
            else if (activeBugData.current.vx < -GLOBALS.maxSpeed) {
                activeBugData.current.vx = -GLOBALS.maxSpeed;
                activeBugData.current.ax = 0;
            }

            activeBugData.current.vy += activeBugData.current.ay;
            if (activeBugData.current.vy > GLOBALS.maxSpeed) {
                activeBugData.current.vy = GLOBALS.maxSpeed;
                activeBugData.current.ay = 0;
            }
            else if (activeBugData.current.vy < -GLOBALS.maxSpeed) {
                activeBugData.current.vy = -GLOBALS.maxSpeed;
                activeBugData.current.ay = 0;
            }

            // Adjust position
            activeBugData.current.x += activeBugData.current.vx;
            activeBugData.current.y += activeBugData.current.vy;
            if (activeBugData.current.x < 0) {
                activeBugData.current.vx = Math.abs(activeBugData.current.vx);
                activeBugData.current.ax = Math.abs(activeBugData.current.ax);
            }
            else if (activeBugData.current.x >= stageWidth) {
                activeBugData.current.vx = -Math.abs(activeBugData.current.vx);
                activeBugData.current.ax = -Math.abs(activeBugData.current.ax);
            }
            if (activeBugData.current.y < 0) {
                activeBugData.current.vy = Math.abs(activeBugData.current.vy);
                activeBugData.current.ay = Math.abs(activeBugData.current.ay);
            }
            else if (activeBugData.current.y >= stageWidth) {
                activeBugData.current.vy = -Math.abs(activeBugData.current.vy);
                activeBugData.current.ay = -Math.abs(activeBugData.current.ay);
            }

            if ((activeBugData.current.vx < 0 && activeBugData.current.defaultOrientation === "rightward") ||
                (activeBugData.current.vx > 0 && activeBugData.current.defaultOrientation === "leftward")) {
                activeBugData.current.scaleX = -1;
                activeBugData.current.scaleY = 1;
            }
            else {
                activeBugData.current.scaleX = 1;
                activeBugData.current.scaleY = 1;
            }
        }

        const checkForLanding = () => {
            let nearSite = false;
            let onOrnament = "";
            let site;
            for (site of landingSites.current) {
                if ((site.x - 5 < activeBugData.current.x && site.x + site.width + 5 > activeBugData.current.x) &&
                    (site.y - 5 < activeBugData.current.y && site.y + site.height + 5 > activeBugData.current.y)) {
                    nearSite = true;
                    onOrnament = site.onOrnament;
                    break;
                }
            }

            if (nearSite && Math.random() < GLOBALS.sitChance) {
                // If on an ornament, check whether it is broken
                setRequestBugSitting(onOrnament);
                landingSiteRef.current = site;
            }
        }

        const moveBug = () => {
            if (bugActive) {
                // Check if bug sitting
                if (activeBugData.current.status === "sitting" && 
                    counter - activeBugData.current.sitStart > GLOBALS.sitTime && 
                    Math.random() > 0.3) {
                    // Put back in flight
                    activeBugData.current.status = "flying";
                    activeBugData.current.image = bugData.current[bugNum.current].flying.image;
                    setActiveBugDataState(activeBugData.current);
                }
                else if (activeBugData.current.status === "flying") {
                    // Check for changes to motion
                    doChangesToMotion();
                    performMotion();
                    checkForLanding();

                    // Update the state
                    setActiveBugDataState(activeBugData.current);
                    setBugX(activeBugData.current.x);
                    setBugY(activeBugData.current.y);
                }
                let c = counter + 1; 
                setCounter(c);
                if (c > activeBugData.current.numBugSteps) {
                    setBugActive(false);
                    if (bugCount > 0) {
                        setBugCount(prev => prev - 1);
                        setTimeout(() => {
                            setBugStart(true);
                        }, 2000);
                    }
                    setCounter(0);
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

    
    }, [
        bugActive, 
        bugCount, 
        setBugCount, 
        setBugStart, 
        counter, 
        stageWidth, 
        stageHeight, 
        setBugX, 
        setBugY, 
        setRequestBugSitting, 
        swatterX,
        swatterY,
        app])

    // Implement bug sitting if it applies
    useEffect(() => {
        if (sittingDue && bugActive && landingSiteRef.current) {
            // Do the landing
            activeBugData.current.status = "sitting";
            activeBugData.current.sitStart = counter;
            activeBugData.current.image = bugData.current[bugNum.current].sitting.image;
            // Set the position
            activeBugData.current.x = landingSiteRef.current.x + landingSiteRef.current.width / 2;
            activeBugData.current.y = landingSiteRef.current.y + landingSiteRef.current.height / 2;
            setActiveBugDataState(activeBugData.current);
            setSittingDue(false);
            setRequestBugSitting("");
        }
    }, [sittingDue, setSittingDue, setRequestBugSitting, counter, bugActive])

    // Allow for bug hit
    useEffect(() => {
        if (bugHitScored) {
            setBugActive(false);
            setTimeout(() => {
                setBugStart(true);
            }, 3000);
            setBugHitScored(false);
        }
    }, [bugHitScored, setBugHitScored, setBugStart])

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
