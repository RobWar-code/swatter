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
    setSwatterSwiped,
    setBugHit,
    bugHitScored,
    setBugHitScored,
    bugCount,
    setBugCount,
    swatterStrikeX,
    setSwatterStrikeX,
    swatterStrikeY,
    setSwatterStrikeY,
    getOrnamentBroken,
    setGetOrnamentBroken,
    setOrnamentBroken,
    resetOrnaments,
    setResetOrnaments,
    gameEase,
    introDone
}) {
    const [bugStart, setBugStart] = useState(false);
    const [requestBugSitting, setRequestBugSitting] = useState("");
    const [sittingDue, setSittingDue] = useState(false);
    const [bugX, setBugX] = useState(0);
    const [bugY, setBugY] = useState(0);
    const [swatterX, setSwatterX] = useState(0);
    const [swatterY, setSwatterY] = useState(0);

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
                getOrnamentBroken={getOrnamentBroken}
                setGetOrnamentBroken={setGetOrnamentBroken}
                setOrnamentBroken={setOrnamentBroken}
                swatterStrikeX={swatterStrikeX}
                swatterStrikeY={swatterStrikeY}
                requestBugSitting={requestBugSitting}
                setRequestBugSitting={setRequestBugSitting}
                setSittingDue={setSittingDue}
                resetOrnaments={resetOrnaments}
                setResetOrnaments={setResetOrnaments}
            />
            {introDone &&
            <Bug 
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                stageScale={stageScale}
                bugStart={bugStart}
                setBugStart={setBugStart}
                bugCount={bugCount}
                setBugCount={setBugCount}
                globalImageData={globalImageData}
                setBugX={setBugX}
                setBugY={setBugY}
                setRequestBugSitting={setRequestBugSitting}
                sittingDue={sittingDue}
                setSittingDue={setSittingDue}
                bugHitScored={bugHitScored}
                setBugHitScored={setBugHitScored}
                swatterX={swatterX}
                swatterY={swatterY}
                gameEase={gameEase}
            />
            }
            <Swatter
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                stageScale={stageScale}
                globalImageData={globalImageData}
                setSwatterSwiped={setSwatterSwiped}
                setBugHit={setBugHit}
                bugX={bugX}
                bugY={bugY}
                setSwatterStrikeX={setSwatterStrikeX}
                setSwatterStrikeY={setSwatterStrikeY}
                setSwatterX={setSwatterX}
                setSwatterY={setSwatterY}
            />
        </Stage>
    )
}