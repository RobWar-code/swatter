import {useState} from 'react';
import {Stage, Sprite} from '@pixi/react';
import Ornaments from './Ornaments';
import alcove from '../assets/images/alcove.png';
import Bug from './Bug';
import Swatter from './Swatter';

export default function GameStage({
    stageWidth, 
    stageHeight, 
    stageScale, 
    globalImageData,
    lastBugScore,
    setLastBugScore,
    gameScore,
    setGameScore,
    bugCount,
    setBugCount,
    lastGameScore,
    setLastGameScore
}) {
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
            <Swatter
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                stageScale={stageScale}
                globalImageData={globalImageData}
                lastBugScore={lastBugScore}
                setLastBugScore={setLastBugScore}
                gameScore={gameScore}
                setGameScore={setGameScore}
                bugCount={bugCount}
                setBugCount={setBugCount}
                lastGameScore={lastGameScore}
                setLastGameScore={setLastGameScore}
            />
        </Stage>
    )
}