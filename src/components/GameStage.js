import {useState} from 'react';
import {Stage, Sprite} from '@pixi/react';
import Ornaments from './Ornaments';
import alcove from '../assets/images/alcove.png';
import Bug from './Bug';

export default function GameStage({stageWidth, stageHeight, stageScale, globalImageData}) {
    const [bugStart, setBugStart] = useState(false);

    return (
        <Stage width={stageWidth} height={stageHeight}>
            <Sprite 
                image={alcove}
                scale={{x: stageScale, y: stageScale}}
                anchor={{x:0, y:0}}
                x={0}
                y={0}
            />
            <Ornaments 
                stageScale={stageScale}
                globalImageData={globalImageData}
            />
            <Bug 
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                stageScale={stageScale}
                bugStart={bugStart}
                setBugStart={setBugStart}
                globalImageData={globalImageData}
            />
        </Stage>
    )
}