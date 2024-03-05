import {useEffect, useState, useRef} from 'react';
import {Stage, Sprite, Text} from '@pixi/react';


export default function ScoreChart({
    globalImageData,
    scoreChartWidth,
    scoreChartHeight,
    scoreChartScaleX,
    scoreChartScaleY,
    gameNum,
    lastGameScore,
    gameScore,
    bugCount,
    scoreTable
}) {
    const [initial, setInitial] = useState(true);
    const scoreChartData = useRef();
    const [scoreChartDataState, setScoreChartDataState] = useState({});
    const scoreText = useRef();
    const [scoreTextState, setScoreTextState] = useState([]); 
    const fontLayout = useRef();
    const [fontLayoutState, setFontLayoutState] = useState([]);


    useEffect(() => {
        // Collect the image data
        if (initial && globalImageData) {
            scoreChartData.current = {}
            let found = false;
            for (let item of globalImageData) {
                if (item.type === "score chart") {
                    scoreChartData.current = item;
                    found = true;
                    break; 
                }
            }
            if (found) {
                let fileName = scoreChartData.current.file;
                scoreChartData.current.image = `${process.env.PUBLIC_URL}/static/graphics/${fileName}`;
                console.log(scoreChartData.current.image);
                setScoreChartDataState(scoreChartData.current);
                setInitial(false);
            }
            else {
                console.log("Could not find score chart in image data");
            }
        }
    }, [initial, globalImageData])

    // Log scores when updated
    useEffect(() => {

        const getFontLayoutDetails = () => {
            let fontLayout = {};
            fontLayout.textTop = scoreChartData.current.textTop * scoreChartScaleY;
            fontLayout.textLeft = scoreChartData.current.textLeft * scoreChartScaleX;
            fontLayout.fontSize = ((scoreChartData.current.textRight - scoreChartData.current.textLeft)/10) * scoreChartScaleX;
            let c = scoreChartData.current;
            fontLayout.textCenter = (c.textLeft + (c.textRight - c.textLeft)/ 2) * scoreChartScaleX;
            return fontLayout;
        }

        fontLayout.current = getFontLayoutDetails();

        // Setup the font details
        fontLayout.current.font = "Helvetica, sans-serif";
        fontLayout.current.fill = ['#ffffff', '#ffffff'];
        fontLayout.current.stroke = '#ffffff';

        // Setup the text
        scoreText.current = [];
        let lineY = 0;
        console.log(fontLayout.current.textCenter);
        let text1 = {
            text: "Score Chart",
            x: fontLayout.current.textCenter - 6 * (fontLayout.current.fontSize * 1/2.7),
            y: fontLayout.current.textTop
        }
        scoreText.current.push(text1);
        lineY += fontLayout.current.fontSize + 5;
        let text2 = {
            text: "Game Number: " + gameNum,
            x: fontLayout.current.textLeft,
            y: fontLayout.current.textTop + lineY
        }
        scoreText.current.push(text2);
        lineY += fontLayout.current.fontSize + 5;
        let text3 = {
            text: "Bugs Remaining: " + bugCount,
            x: fontLayout.current.textLeft,
            y: fontLayout.current.textTop + lineY
        }
        scoreText.current.push(text3);
        lineY += fontLayout.current.fontSize + 5;
        let text4 = {
            text: "Game Score: " + gameScore,
            x: fontLayout.current.textLeft,
            y: fontLayout.current.textTop + lineY
        }
        scoreText.current.push(text4);
        lineY += fontLayout.current.fontSize + 5;
        let text5 = {
            text: "Last Game: " + lastGameScore,
            x: fontLayout.current.textLeft,
            y: fontLayout.current.textTop + lineY
        }
        scoreText.current.push(text5);
        lineY += fontLayout.current.fontSize + 5;
        // Determine the high score
        let highScore = 0;
        if (scoreTable.length) {
            highScore = Math.max(...scoreTable.map(item => item.score));
        }
        let text6 = {
            text: "High Score: " + highScore,
            x: fontLayout.current.textLeft,
            y: fontLayout.current.textTop + lineY
        }
        scoreText.current.push(text6);

        setScoreTextState(scoreText.current);
        setFontLayoutState(fontLayout.current);

    }, [gameScore, lastGameScore, scoreTable, bugCount, gameNum, scoreChartScaleX, scoreChartScaleY])

    return (
        <Stage width={scoreChartWidth} height={scoreChartHeight}>
            {!initial && 
            <>
            <Sprite 
                image={scoreChartDataState.image}
                scale={{x:scoreChartScaleX, y:scoreChartScaleY}}
                anchor={{x:0, y:0}}
                x={0}
                y={0}
            />
            {scoreTextState.map((item, index) => 
            <Text key={index}
                text={item.text}
                anchor={{x: 0, y: 0}}
                x={item.x}
                y={item.y}
                style={{
                        fontFamily: fontLayoutState.font,
                        fontSize: fontLayoutState.fontSize,
                        fill: fontLayoutState.fill,
                        stroke: fontLayoutState.stroke
                    }
                }
            />
            )}
            </>
            }
        </Stage>
    )
}