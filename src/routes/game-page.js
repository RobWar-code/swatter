import {useState, useRef, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import GameStage from '../components/GameStage';
import GLOBALS from '../constants/constants';

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
    const [bugCount, setBugCount] = useState(GLOBALS.bugsPerGame);
    const [swatterSwiped, setSwatterSwiped] = useState(false);
    const [bugHit, setBugHit] = useState(0);
    const [getOrnamentBroken, setGetOrnamentBroken] = useState(false);
    const [ornamentBroken, setOrnamentBroken] = useState(false);
    const [swatterStrikeX, setSwatterStrikeX] = useState(0);
    const [swatterStrikeY, setSwatterStrikeY] = useState(0)
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

    // Do the scoring for a bug hit
    useEffect(() => {
        setGameScore(prevScore => prevScore + 10);
        setBugCount(prevCount => prevCount - 1);
    }, [bugHit])

    useEffect(() => {
        if (swatterSwiped) {
            setGetOrnamentBroken(true);
        }
    }, [swatterSwiped])

    // Adjust score for broken ornament
    useEffect(() => {
        if (ornamentBroken) {
            setGameScore(prevScore => prevScore - 15);
            setOrnamentBroken(false);
        }
    }, [ornamentBroken])



    return (
        <Container>
            <Row>
                <Col ref={stageCol} className="text-center" md={6}>
                    <GameStage
                        stageWidth={stageWidth}
                        stageHeight={stageHeight}
                        stageScale={stageScale}
                        globalImageData={globalImageData}
                        setSwatterSwiped={setSwatterSwiped}
                        setBugHit={setBugHit}
                        swatterStrikeX={swatterStrikeX}
                        setSwatterStrikeX={setSwatterStrikeX}
                        swatterStrikeY={swatterStrikeY}
                        setSwatterStrikeY={setSwatterStrikeY}
                        getOrnamentBroken={getOrnamentBroken}
                        setGetOrnamentBroken={setGetOrnamentBroken}
                        setOrnamentBroken={setOrnamentBroken}
                    />
                </Col>
            </Row>
        </Container>
    )
}