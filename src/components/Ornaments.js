import {useRef, useState, useEffect} from 'react';
import {Sprite} from '@pixi/react';

export default function Ornaments({
    stageScale,
    globalImageData,
    getOrnamentBroken,
    setGetOrnamentBroken,
    setOrnamentBroken,
    swatterStrikeX,
    swatterStrikeY
}) {
    const ornamentData = useRef();
    const [ornamentDataState, setOrnamentDataState] = useState([]);

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
        }
    }, [globalImageData, initial])

    // Set the additional data in the ornament data
    useEffect(() => {
        if (ornamentData.current) {
            for (let i = 0; i < ornamentData.current.length; i++) {
                let ornament = ornamentData.current[i];
                ornament.isBroken = false;
                ornament.id = i + 1;
                // Set the whole image details
                let ornamentWhole = ornament.whole;
                ornamentWhole.image = `${process.env.PUBLIC_URL}/static/graphics/${ornamentWhole.file}`;
                ornamentWhole.actualX = ornamentWhole.x * stageScale;
                ornamentWhole.actualY = ornamentWhole.y * stageScale;
                ornamentWhole.actualWidth = ornamentWhole.width * stageScale;
                ornamentWhole.actualHeight = ornamentWhole.height * stageScale;

                // Set the broken ornament image details
                let ornamentBroken = ornament.broken;
                ornamentBroken.image = `${process.env.PUBLIC_URL}/static/graphics/${ornamentBroken.file}`;
                ornamentBroken.actualX = ornamentBroken.x * stageScale;
                ornamentBroken.actualY = ornamentBroken.y * stageScale;
                ornamentBroken.actualWidth = ornamentBroken.width * stageScale;
                ornamentBroken.actualHeight = ornamentBroken.height * stageScale;
            }
            setOrnamentDataState(ornamentData.current);
        }
    }, [stageScale])

    // Check whether an ornament has been broken
    useEffect(() => {
 
        if (getOrnamentBroken) {
            console.log("Get Ornament Broken Test", swatterStrikeX, swatterStrikeY, ornamentData.current);
            let found = false;
            let count = 0;
            let ornament;
            for (ornament of ornamentData.current) {
                console.log("actualX, actualY", ornament, ornament.whole.x, ornament.whole.y);
                if (swatterStrikeX > ornament.whole.actualX && 
                    swatterStrikeX < ornament.whole.actualX + ornament.whole.actualWidth &&
                    swatterStrikeY > ornament.whole.actualY &&
                    swatterStrikeY < ornament.whole.actualY + ornament.whole.actualHeight) {
                        found = true;
                        break;
                }
                ++count;
            }
            if (found) {
                if (!ornament.isBroken) {
                    console.log("Broken Ornament");
                    setOrnamentBroken(true);
                    ornament.isBroken = true;
                    setOrnamentDataState(ornamentData.current);
                }
            }
            setGetOrnamentBroken(false);
        }

    }, [getOrnamentBroken, setGetOrnamentBroken, setOrnamentBroken, swatterStrikeX, swatterStrikeY])

    return (
        <>
        {!initial && (
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