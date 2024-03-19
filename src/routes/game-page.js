import {useState, useRef, useEffect, useCallback} from 'react';
import {useOutletContext} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import GameStage from '../components/GameStage';
import ScoreChart from '../components/ScoreChart';
import EaseControl from '../components/EaseControl';
import IntroModal from '../components/IntroModal';
import SoundControl from '../components/SoundControl';
import PauseControl from '../components/PauseControl';
import GLOBALS from '../constants/constants';
import scrollArrow from '../assets/images/scroll-arrow.png';


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
        setBugCount,
        introDone,
        setIntroDone,
        gameEndCurrent,
        setGameEndCurrent
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
    const [swatterStrikeY, setSwatterStrikeY] = useState(0);
    const [gameEase, setGameEase] = useState(1);
    const [gameEnd, setGameEnd] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [doSound, setDoSound] = useState("");
    const [pauseOn, setPauseOn] = useState(false);
    const [singleCol, setSingleCol] = useState(false);

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
            // Determine whether single col width
            const screenWidth = window.innerWidth;
            if (screenWidth >= 992) {
                setSingleCol(false);
            }
            else {
                setSingleCol(true);
            }
            // Set the score chart sizes
            setScoreChartWidth(sWidth);
            setScoreChartHeight(sHeight);
            setScoreChartScaleX(sWidth/1024);
            setScoreChartScaleY(sHeight/1024);
    };

    // Get the alcove width and height
    useEffect(() => {

        if (graphicData.length) {
            for (let i = 0; i < graphicData.length; i++) {
                if (graphicData[i].type === "stage") {
                    alcoveWidth.current = graphicData[i].width;
                    alcoveHeight.current = graphicData[i].height;
                    break;
                }
            }

            // Determine Stage Size
            determineStageSize();
            setGlobalImageData(graphicData);
        }


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
            setDoSound("splat");
            setGameScore(prevScore => prevScore + Math.floor(GLOBALS.bugHitScore * gameEase));
            setBugHitScored(true);
            setBugCount(prevCount => prevCount - 1);
            setBugHit(false);
        }
    }, [bugHit, gameEase, setBugCount, setGameScore])

    const setGameStartStates = useCallback(() => {
        console.log("Timed Game End Operations")
        setGameNum(prev => prev + 1);
        setBugCount(GLOBALS.bugsPerGame);
        setResetOrnaments(true);
        setLastGameScore(gameScore);
        setGameScore(0);
        setGameEndCurrent(false);
    }, [gameScore, setBugCount, setGameNum, setGameScore, setLastGameScore, setGameEndCurrent])

    // Do the end of game scoring
    useEffect(() => {
        if (bugCount <= 0 && !gameEndCurrent) {
            setGameEnd(true);
            setGameEndCurrent(true);
            setScoreTable(prev => [...prev, {score: gameScore, gameNum: gameNum}]);
            setTimeout(() => {
                setGameStartStates();
            }, 9000);
        }
    }, [
        bugCount, 
        gameNum, 
        gameScore, 
        setScoreTable, 
        setGameStartStates, 
        gameEndCurrent, 
        setGameEndCurrent])

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
                <Col ref={stageCol} className="text-center" lg={6}>
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
                        gameEase={gameEase}
                        introDone={introDone}
                        gameEnd={gameEnd}
                        setDoSound={setDoSound}
                        pauseOn={pauseOn}
                    />
                </Col>
                {singleCol && 
                    <Col className="text-center">
                        <img src={scrollArrow} width="40" height="60" alt="page scroll" title="On mobiles swipe to scroll"/>
                    </Col>
                }
                <Col className="text-center" lg={6}>
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
                        gameEnd={gameEnd}
                        setGameEnd={setGameEnd}
                    />
                    {!introDone &&
                        <IntroModal setIntroDone={setIntroDone} />
                    }
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <SoundControl 
                        className="soundControl"
                        soundEnabled={soundEnabled} 
                        setSoundEnabled={setSoundEnabled}
                        doSound={doSound}
                        setDoSound={setDoSound}
                    />
                    <PauseControl pauseOn={pauseOn} setPauseOn={setPauseOn} />
                </Col>
                <Col className="text-center" lg={6}>
                    <EaseControl gameEase={gameEase} setGameEase={setGameEase} />
                </Col>
            </Row>
        </Container>
    )
}