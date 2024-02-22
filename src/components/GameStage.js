import {Stage, Sprite} from '@pixi/react';
import Ornaments from './Ornaments';
import alcove from '../assets/images/alcove.png';

export default function GameStage({stageWidth, stageHeight, stageScale, globalImageData}) {

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
        </Stage>
    )
}