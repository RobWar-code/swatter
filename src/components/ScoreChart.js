import {Stage, Sprite} from '@pixi/react';


export default function ScoreChart({
    scoreChart

}) {

    return (
        <Stage width={scoreChartWidth} height={scoreChartHeight}>
            <Sprite 
                image={scoreChartImage}
                scale={{x:scoreChartScaleX, y:scoreChartScaleY}}
                anchor={{x:0, y:0}}
                x={0}
                y={0}
            />
        </Stage>
    )
}