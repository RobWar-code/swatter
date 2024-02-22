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
            console.log("Stage Details:", alcoveWidth.current, stageColWidth, sWidth, sHeight, scale);
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
                console.log("Alcove:", alcoveWidth.current, alcoveHeight.current);
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

        console.log("Got to effect");
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
                    />
                </Col>
            </Row>
        </Container>
    )
}