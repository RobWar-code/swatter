import {useRef, useState, useEffect} from 'react';
import {Sprite} from '@pixi/react';

export default function Ornaments({
    stageScale,
    globalImageData,
    getOrnamentBroken,
    setGetOrnamentBroken,
    setOrnamentBroken,
    swatterStrikeX,
    swatterStrikeY,
    requestBugSitting,
    setRequestBugSitting,
    sittingDue,
    setSittingDue,
    resetOrnaments,
    setResetOrnaments,
    setDoSound,
    ornamentDrawReady,
    setOrnamentDrawReady
}) {
    const ornamentData = useRef();
    const [ornamentDataState, setOrnamentDataState] = useState([]);
    const [gotOrnamentData, setGotOrnamentData] = useState(false);
    const [initial, setInitial] = useState(true);

    // Get the ornament data
    useEffect(() => {
        if (initial && globalImageData.length) {
            for (let item of globalImageData) {
                if (item.type === "ornaments") {
                    ornamentData.current = item.files;
                    break;
                }
            }
            setInitial(false);
            setGotOrnamentData(true);
        }
    }, [globalImageData, initial])

    // Set the additional data in the ornament data
    useEffect(() => {
        if (gotOrnamentData && !ornamentDrawReady) {
            for (let i = 0; i < ornamentData.current.length; i++) {
                let ornament = ornamentData.current[i];
                ornament.isBroken = false;
                ornament.id = i + 1;
                // Set the whole image details
                ornament.whole.image = `${process.env.PUBLIC_URL}/static/graphics/${ornament.whole.file}`;
                ornament.whole.actualX = ornament.whole.x * stageScale;
                ornament.whole.actualY = ornament.whole.y * stageScale;
                ornament.whole.actualWidth = ornament.whole.width * stageScale;
                ornament.whole.actualHeight = ornament.whole.height * stageScale;

                // Set the broken ornament image details
                ornament.broken.image = `${process.env.PUBLIC_URL}/static/graphics/${ornament.broken.file}`;
                ornament.broken.actualX = ornament.broken.x * stageScale;
                ornament.broken.actualY = ornament.broken.y * stageScale;
                ornament.broken.actualWidth = ornament.broken.width * stageScale;
                ornament.broken.actualHeight = ornament.broken.height * stageScale;
            }
            setOrnamentDataState(ornamentData.current);
            setOrnamentDrawReady(true);
        }
    }, [gotOrnamentData, stageScale, ornamentDrawReady, setOrnamentDrawReady])

    // Check whether an ornament has been broken
    useEffect(() => {
 
        if (getOrnamentBroken) {
            let found = false;
            let ornament;
            for (ornament of ornamentData.current) {
                if (swatterStrikeX > ornament.whole.actualX && 
                    swatterStrikeX < ornament.whole.actualX + ornament.whole.actualWidth &&
                    swatterStrikeY > ornament.whole.actualY &&
                    swatterStrikeY < ornament.whole.actualY + ornament.whole.actualHeight) {
                        found = true;
                        break;
                }
            }
            if (found) {
                if (!ornament.isBroken) {
                    setDoSound("crash");
                    setOrnamentBroken(true);
                    ornament.isBroken = true;
                    setOrnamentDataState(ornamentData.current);
                }
            }
            setGetOrnamentBroken(false);
        }

    }, [getOrnamentBroken, setGetOrnamentBroken, setOrnamentBroken, swatterStrikeX, swatterStrikeY, setDoSound])

    // Check whether the ornament on which a fly may settle is broken
    useEffect (() => {
        // Check the ornament data
        let onBrokenOrnament = false;
        let shouldSit = false;
        if (requestBugSitting.indexOf("orna") !== -1) {
            // Get ornament number from the request
            let s = requestBugSitting;
            let p = parseInt(s.substring(4,6)) - 1;
            if (ornamentData.current[p].isBroken) {
                onBrokenOrnament = true;
            }
        
            if (!onBrokenOrnament) {
                shouldSit = true;
            }
        }
        else if (requestBugSitting === "no") {
            shouldSit = true;
        }
        setSittingDue(shouldSit);
        setRequestBugSitting("");
    }, [requestBugSitting, setRequestBugSitting, setSittingDue])

    // Check for reset of broken ornaments (when a game is completed)
    useEffect(() => {
        if (!initial && resetOrnaments) {
            for (let item of ornamentData.current) {
                item.isBroken = false;
            }
            setOrnamentDataState(ornamentData.current);
            setResetOrnaments(false);
        }

    }, [initial, resetOrnaments, setResetOrnaments])

    return (
        <>
        {ornamentDrawReady && (
            <>
            {ornamentDataState.map((item, index) => {
                let representation = item.whole;
                if (item.isBroken) {
                    representation = item.broken;
                }
                let x = representation.actualX;
                let y = representation.actualY + representation.actualHeight;
                let key = item.id ? item.id : index;
                return (
                    <Sprite key={key}
                        image={representation.image}
                        scale={{x: stageScale, y: stageScale}}
                        anchor={{x: 0, y: 1}}
                        x={x}
                        y={y}
                    />
                )
            })}
            </>
            )
        }
        </>

    )
}