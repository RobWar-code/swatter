import {useRef, useState, useEffect} from 'react';
import {Sprite} from '@pixi/react';
const ornamentImages = require.context('../assets/images/', false, /orna.*\.png$/);

export default function Ornaments({
    stageScale,
    globalImageData
}) {
    const ornamentData = useRef();
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
                let fileName = './' + ornamentWhole.file;
                ornamentWhole.image = ornamentImages(fileName);
                console.log("stageScale:", stageScale);
                ornamentWhole.actualX = ornamentWhole.x * stageScale;
                ornamentWhole.actualY = ornamentWhole.y * stageScale;
                ornamentWhole.actualWidth = ornamentWhole.width * stageScale;
                ornamentWhole.actualHeight = ornamentWhole.height * stageScale;

                // Set the broken ornament image details
                let ornamentBroken = ornament.broken;
                fileName = './' + ornamentBroken.file;
                ornamentBroken.image = ornamentImages(fileName);
                ornamentBroken.actualX = ornamentBroken.x * stageScale;
                ornamentBroken.actualY = ornamentBroken.y * stageScale;
                ornamentBroken.actualWidth = ornamentBroken.width * stageScale;
                ornamentBroken.actualHeight = ornamentBroken.height * stageScale;
            }
        }
        setInitial(false);
    }, [initial, stageScale])


    return (
        <>
        {ornamentData.current && (
            <>
            {ornamentData.current.map((item, index) => {
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