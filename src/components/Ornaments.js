import {useRef, useState, useEffect} from 'react';
import {Sprite} from '@pixi/react';

// Ornament Files
import orna01 from '../assets/images/orna01.png';
import orna01Broken from '../assets/images/orna01-broken.png'
import orna02 from '../assets/images/orna02.png';
import orna02Broken from '../assets/images/orna02-broken.png'
import orna03 from '../assets/images/orna03.png';
import orna03Broken from '../assets/images/orna03-broken.png'
import orna04 from '../assets/images/orna04.png';
import orna04Broken from '../assets/images/orna04-broken.png'
import orna05 from '../assets/images/orna05.png';
import orna05Broken from '../assets/images/orna05-broken.png'
import orna06 from '../assets/images/orna06.png';
import orna06Broken from '../assets/images/orna06-broken.png'
import orna07 from '../assets/images/orna07.png';
import orna07Broken from '../assets/images/orna07-broken.png';


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
                ornamentWhole.actualX = ornamentWhole.x * stageScale;
                ornamentWhole.actualY = ornamentWhole.y * stageScale;
                ornamentWhole.actualWidth = ornamentWhole.width * stageScale;
                ornamentWhole.actualHeight = ornamentWhole.height * stageScale;

                // Set the broken ornament image details
                let ornamentBroken = ornament.broken;
                ornamentBroken.actualX = ornamentBroken.x * stageScale;
                ornamentBroken.actualY = ornamentBroken.y * stageScale;
                ornamentBroken.actualWidth = ornamentBroken.width * stageScale;
                ornamentBroken.actualHeight = ornamentBroken.height * stageScale;
            }
            // Assign the images
            ornamentData.current[0].whole.image = orna01;
            ornamentData.current[0].broken.image = orna01Broken;
            ornamentData.current[1].whole.image = orna02;
            ornamentData.current[1].broken.image = orna02Broken;
            ornamentData.current[2].whole.image = orna03;
            ornamentData.current[2].broken.image = orna03Broken;
            ornamentData.current[3].whole.image = orna04;
            ornamentData.current[3].broken.image = orna04Broken;
            ornamentData.current[4].whole.image = orna05;
            ornamentData.current[4].broken.image = orna05Broken;
            ornamentData.current[5].whole.image = orna06;
            ornamentData.current[5].broken.image = orna06Broken;
            ornamentData.current[6].whole.image = orna07;
            ornamentData.current[6].broken.image = orna07Broken;
            
        }
        setInitial(false);
    }, [initial, stageScale])


    return (
        <>
        {!initial && ornamentData.current && (
            <>
            {ornamentData.current.map((item, index) => {
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
                        image={orna01}
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