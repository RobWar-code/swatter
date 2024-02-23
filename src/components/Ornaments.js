import {useRef, useState, useEffect} from 'react';
import {Sprite} from '@pixi/react';

export default function Ornaments({
    stageScale,
    globalImageData
}) {
    const ornamentData = useRef();
    const [ornamentDataState, setOrnamentDataState] = useState([]);

    const [initial, setInitial] = useState(true);

    // Get the ornament data
    useEffect(() => {
        for (let item of globalImageData) {
            if (item.type === "ornaments") {
                ornamentData.current = item.files;
                break;
            }
        }
    }, [globalImageData])

    // Set the additional data in the ornament data
    useEffect(() => {
        if (initial && ornamentData.current) {
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
            setInitial(false); 
        }
    }, [initial, stageScale])

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
                console.log("key:", key);
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