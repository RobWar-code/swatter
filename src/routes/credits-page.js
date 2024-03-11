import {useState, useEffect, useRef} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Sprite, Stage, Text} from '@pixi/react';
import {useOutletContext} from 'react-router-dom';


export default function CreditsPage() {
    const [graphicsData] = useOutletContext();
    const [gotImageData, setGotImageData] = useState(false);
    const [imageStats, setImageStats] = useState({});
    const imageData = useRef();
    const [imageDataState, setImageDataState] = useState({});
    const [imageScale, setImageScale] = useState(1);
    const [gotScaledData, setGotScaledData] = useState(false);
    const textData = useRef();
    const [textDataState, setTextDataState] = useState([]);
    const [gotTextData, setGotTextData] = useState(false);
    const [stageWidth, setStageWidth] = useState(390);
    const [stageHeight, setStageHeight] = useState(390);
    const textCol = useRef(null);

    // Obtain the image data
    useEffect(() => {
        if (graphicsData.length) {
            let found = false;
            let item;
            for (item of graphicsData) {
                if (item.type === "credit sheet") {
                    found = true;
                    break;
                }
            }
            if (found) {
                setImageStats(item);
                setGotImageData(true);
            }
            else {
                console.log("Credits Image Not Found")
            }
        }

    }, [graphicsData])

    // Get the scale and stage size etc.
    useEffect(() => {
        const getImageDetails = () => {
            const colWidth = textCol.current.offsetWidth;
            const displayHeight = window.innerHeight - 100;
            let sx = colWidth / imageStats.width;
            if (sx * imageStats.height > displayHeight) {
                sx = displayHeight / imageStats.height;
            }
            setImageScale(sx);
            setStageWidth(sx * imageStats.width);
            setStageHeight(sx * imageStats.height);
    
            // Get the text layout details (to scale)
            imageData.current = {};
            imageData.current.image = `${process.env.PUBLIC_URL}/static/graphics/${imageStats.file}`;
            imageData.current.textTop = imageStats.textTop * sx;
            imageData.current.textLeft = imageStats.textLeft * sx;
            imageData.current.textRight = imageStats.textRight * sx;
            imageData.current.textBottom = imageStats.textBottom * sx;
            imageData.current.textCenter = (imageStats.textLeft + (imageStats.textRight - imageStats.textLeft) / 2) * sx;
            imageData.current.fontSize = 17 * sx;
            imageData.current.lineHeight = imageData.current.fontSize + 5;
    
            imageData.current.font = "Helvetica, sans-serif";
            imageData.current.fill = ['#000000', '#000000'];
            imageData.current.stroke = '#000000';
            setImageDataState(imageData.current);
            setGotScaledData(true);
        }
    
        const handleResize = ( () => {
            getImageDetails();
        })

        window.addEventListener("resize", handleResize);

        if (gotImageData) {
            getImageDetails();
        }

        return () => window.removeEventListener("resize", handleResize)

    }, [gotImageData, imageStats])
    
    // Set-up the text data
    useEffect(() => {
        if (gotScaledData) {
            textData.current = [];
            let text1 = {
                text: "Credits",
                anchor: {x:0.5, y:0},
                x: imageData.current.textCenter,
                y: imageData.current.textTop
            };
            textData.current.push(text1);
            let y = imageData.current.textTop + imageData.current.lineHeight;
            let text2 = {
                text: "Sounds",
                anchor: {x:0.5, y:0},
                x: imageData.current.textCenter,
                y: y
            };
            textData.current.push(text2);
            y += imageData.current.lineHeight;
            let text3 = {
                text: "Bee Buzzing - Author DrDufus",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text3);
            y += imageData.current.lineHeight;
            let text4 = {
                text: "https://freesound.org/people/DrDufus/sounds/462875/",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text4);
            y += imageData.current.lineHeight + 2;
            let text5 = {
                text: "Leaving Buzz - funwithsound",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text5);
            y += imageData.current.lineHeight;
            let text6= {
                text: "https://freesound.org/people/FunWithSound/sounds/390733/",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text6);
            y += imageData.current.lineHeight + 2;
            let text7= {
                text: "Splat - sebastiantate",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text7);
            y += imageData.current.lineHeight;
            let text8= {
                text: "https://freesound.org/people/sebastientate/sounds/719131/",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text8);
            y += imageData.current.lineHeight + 2;
            let text9= {
                text: "Crash - DNABeast",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text9);
            y += imageData.current.lineHeight;
            let text10 = {
                text: "https://freesound.org/people/DNABeast/sounds/127200/",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y
            };
            textData.current.push(text10);
            setGotTextData(true);
            setTextDataState(textData.current);
        }
    }, [gotScaledData])

    return (
        <Row>
            <Col ref={textCol} className="text-center">
            {gotImageData &&
                <Stage width={stageWidth} height={stageHeight}>
                    {gotTextData && 
                        <>
                        <Sprite
                            image={imageDataState.image}
                            anchor={{x:0, y:0}}
                            scale={imageScale}
                            x={0}
                            y={0}
                        />
                        {
                            textDataState.map((item, index) =>
                                <Text
                                    key={index}
                                    text={item.text}
                                    anchor={item.anchor}
                                    x={item.x}
                                    y={item.y}
                                    style={{
                                        font: imageDataState.font,
                                        fontSize: imageDataState.fontSize,
                                        fill: imageDataState.fill,
                                        stroke: imageDataState.stroke
                                    }}
                                />
                            )
                        }
                        </>
                    }
                </Stage>
            }
            </Col>
        </Row>
    )
}