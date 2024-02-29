import {useState, useRef, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import GameStage from '../components/GameStage';

export default function GamePage() {
    const [,,graphicData] = useOutletContext();
    const [stageWidth, setStageWidth] = useState(390);
    const [stageHeight, setStageHeight] = useState(375);
    const [stageScale, setStageScale] = useState(1);
    const [globalImageData, setGlobalImageData] = useState([]);
    const alcoveWidth = useRef(0);
    const alcoveHeight = useRef(0);
    const stageCol = useRef(null);
    const [lastBugScore, setLastBugScore] = useState(0);
    const [gameScore, setGameScore] = useState(0);
    const [bugCount, setBugCount] = useState(0);
    const [lastGameScore, setLastGameScore] = useState(0);

    const determineStageSize = () => {
            // Get the stage column width
            const stageColWidth = stageCol.current.offsetWidth;
            const screenHeight = window.innerHeight;
            let scale = stageColWidth/alcoveWidth.current;

            if (alcoveHeight.current * scale > screenHeight - 120) {
                scale = (screenHeight - 120) / alcoveHeight.current;
            }
            let sWidth = scale * alcoveWidth.current;
            let sHeight = scale * alcoveHeight.current;
            setStageWidth(sWidth);
            setStageHeight(sHeight);
            setStageScale(scale);
    };

    // Get the alcove width and height
    useEffect(() => {

        for (let i = 0; i < graphicData.length; i++) {
            if (graphicData[i].type === "stage") {
                alcoveWidth.current = graphicData[i].width;
                alcoveHeight.current = graphicData[i].height;
                break;
            }
            // Determine Stage Size
            determineStageSize();
        }

        setGlobalImageData(graphicData);

    }, [graphicData])

    // Get the scale and stage size etc.
    useEffect(() => {
        const handleResize = ( () => {
            determineStageSize();
        })

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)

    }, [])

    return (
        <Container>
            <Row>
                <Col ref={stageCol} className="text-center" md={6}>
                    <GameStage
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
                </Col>
            </Row>
        </Container>
    )
}