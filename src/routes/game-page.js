import {useState, useRef, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import GameStage from '../components/GameStage';
import ScoreChart from '../components/ScoreChart'
import GLOBALS from '../constants/constants';


export default function GamePage() {
    const [graphicData, {
        scoreTable, 
        setScoreTable, 
        gameNum, 
        setGameNum, 
        lastGameScore, 
        setLastGameScore,
        gameScore,
        setGameScore,
        bugCount,
        setBugCount
    }] = useOutletContext();
    const [stageWidth, setStageWidth] = useState(390);
    const [stageHeight, setStageHeight] = useState(375);
    const [stageScale, setStageScale] = useState(1);
    const [scoreChartWidth, setScoreChartWidth] = useState(1024);
    const [scoreChartHeight, setScoreChartHeight] = useState(1024);
    const [scoreChartScaleX, setScoreChartScaleX] = useState(390/1024);
    const [scoreChartScaleY, setScoreChartScaleY] = useState(375/1024);
    const [globalImageData, setGlobalImageData] = useState([]);
    const alcoveWidth = useRef(0);
    const alcoveHeight = useRef(0);
    const stageCol = useRef(null);
    const [resetOrnaments, setResetOrnaments] = useState(false);
    const [swatterSwiped, setSwatterSwiped] = useState(false);
    const [bugHit, setBugHit] = useState(0);
    const [bugHitScored, setBugHitScored] = useState(false);
    const [getOrnamentBroken, setGetOrnamentBroken] = useState(false);
    const [ornamentBroken, setOrnamentBroken] = useState(false);
    const [swatterStrikeX, setSwatterStrikeX] = useState(0);
    const [swatterStrikeY, setSwatterStrikeY] = useState(0)

    // Determine the stage and score chart sizes
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
            // Set the score chart sizes
            setScoreChartWidth(sWidth);
            setScoreChartHeight(sHeight);
            setScoreChartScaleX(sWidth/1024);
            setScoreChartScaleY(sHeight/1024);
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
        if (bugHit) {
            setGameScore(prevScore => prevScore + GLOBALS.bugHitScore);
            setBugCount(prevCount => prevCount - 1);
            setBugHitScored(true);
            setBugHit(false);
        }
    }, [bugHit, setBugCount, setGameScore])

    // Do the end of game scoring
    useEffect(() => {
        if (bugCount <= 0) {
            setLastGameScore(gameScore);
            setScoreTable(prev => [...prev, {score: gameScore, gameNum: gameNum}]);
            setGameNum(prev => prev + 1);
            setBugCount(GLOBALS.bugsPerGame);
            setResetOrnaments(true);
            setGameScore(0);
        }
    }, [bugCount, gameScore, gameNum, setScoreTable, setLastGameScore, setGameNum, setBugCount, setGameScore])

    useEffect(() => {
        if (swatterSwiped) {
            setGetOrnamentBroken(true);
            setSwatterSwiped(false);
        }
    }, [swatterSwiped])

    // Adjust score for broken ornament
    useEffect(() => {
        if (ornamentBroken) {
            setGameScore(prevScore => prevScore + GLOBALS.ornamentBreakScore);
            setOrnamentBroken(false);
        }
    }, [ornamentBroken, setGameScore])



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
                        bugHit={bugHit}
                        setBugHit={setBugHit}
                        bugHitScored={bugHitScored}
                        setBugHitScored={setBugHitScored}
                        bugCount={bugCount}
                        setBugCount={setBugCount}
                        swatterStrikeX={swatterStrikeX}
                        setSwatterStrikeX={setSwatterStrikeX}
                        swatterStrikeY={swatterStrikeY}
                        setSwatterStrikeY={setSwatterStrikeY}
                        getOrnamentBroken={getOrnamentBroken}
                        setGetOrnamentBroken={setGetOrnamentBroken}
                        setOrnamentBroken={setOrnamentBroken}
                        resetOrnaments={resetOrnaments}
                        setResetOrnaments={setResetOrnaments}
                    />
                </Col>
                <Col className="text-center" md={6}>
                    <ScoreChart
                        globalImageData={globalImageData}
                        scoreChartWidth={scoreChartWidth}
                        scoreChartHeight={scoreChartHeight}
                        scoreChartScaleX={scoreChartScaleX}
                        scoreChartScaleY={scoreChartScaleY}
                        gameNum={gameNum}
                        lastGameScore={lastGameScore}
                        gameScore={gameScore}
                        bugCount={bugCount}
                        scoreTable={scoreTable}
                    />
                </Col>
            </Row>
        </Container>
    )
}