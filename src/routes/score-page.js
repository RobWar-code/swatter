import {useEffect, useState, useRef} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useOutletContext} from 'react-router-dom';
import {Stage, Sprite, Text} from '@pixi/react';

export default function ScorePage() {
    const [graphicData, {scoreTable}] = useOutletContext();
    const [tableWidth, setTableWidth] = useState(1200);
    const [tableHeight, setTableHeight] = useState(1200);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const tableData = useRef();
    const [tableDataState, setTableDataState] = useState({});
    const fontData = useRef();
    const [fontDataState, setFontDataState] = useState({});
    const tableCol = useRef(null);
    const [gotTableData, setGotTableData] = useState(false);
    const [gotScaleData, setGotScaleData] = useState(false);
    const textData = useRef();
    const [textDataState, setTextDataState] = useState([]);
    const [gotTextData, setGotTextData] = useState(false);

    // Collect the graphic data for the table
    useEffect (() => {
        if (graphicData.length) {
            let found = false;
            let item;
            for (item of graphicData) {
                if (item.type === "score table") {
                    found = true;
                    break;
                }
            }
            if (found) {
                tableData.current = item;
                tableData.current.image = `${process.env.PUBLIC_URL}/static/graphics/${item.file}`;
                setTableDataState(tableData.current);
                setGotTableData(true);
            }
            else {
                console.log("Could not find score table data");
            }
        }
    }, [graphicData])
    
    const determineTableSize = () => {
        if (tableData.current) {
            const colWidth = tableCol.current.offsetWidth;
            const displayHeight = window.innerHeight - 100;
            let sx = colWidth / tableData.current.width;
            if (sx * tableData.current.height > displayHeight) {
                sx = displayHeight / tableData.current.height;
            }
            setScaleX(sx);
            setScaleY(sx);
            setTableWidth(sx * tableData.current.width);
            setTableHeight(sx * tableData.current.height);

            // Font Details
            fontData.current = {};
            fontData.current.fontSize = 14 * sx;
            fontData.current.font = "Kaushan, Helvetica, sans-serif";
            fontData.current.fill = ['#000000', '#000000'];
            fontData.current.stroke = '#000000';
            fontData.current.textLeft = tableData.current.textLeft * sx;
            fontData.current.textTop = tableData.current.textTop * sx;
            fontData.current.textRight = tableData.current.textRight * sx;
            fontData.current.textBottom = tableData.current.textBottom * sx;
            fontData.current.textCenter = fontData.current.textLeft + (fontData.current.textRight - fontData.current.textLeft) / 2;
            fontData.current.lineHeight = fontData.current.fontSize + 5;
            fontData.current.pageLines = Math.floor((fontData.current.textBottom - fontData.current.textTop) / fontData.current.lineHeight);
            setFontDataState(fontData.current);
            setGotScaleData(true);
        }
    }

    // Get the scale and stage size etc.
    useEffect(() => {
        const handleResize = ( () => {
            determineTableSize();
        })

        window.addEventListener("resize", handleResize);

        if (gotTableData) {
            determineTableSize();
        }

        return () => window.removeEventListener("resize", handleResize)

    }, [gotTableData])

    // Set-up the data to display the scores
    useEffect (() => {
        if (gotScaleData) {
            const lineHeight = fontData.current.lineHeight;
            textData.current = [];
            let text1 = {
                text: "Score Table",
                x: fontData.current.textCenter - 6 * fontData.current.fontSize * 0.35,
                y: fontData.current.textTop
            }
            textData.current.push(text1);
            let y = lineHeight + fontData.current.textTop;
            let x = fontData.current.textLeft + ((fontData.current.textCenter - fontData.current.textLeft) / 2) - 
                2 * fontData.current.fontSize * 0.35;
            const leftCol = x;
            let text2 = {
                text: "Game",
                x: x,
                y: y
            }
            textData.current.push(text2);
            x = fontData.current.textCenter + ((fontData.current.textRight - fontData.current.textCenter) / 2) - 
                2.5 * fontData.current.fontSize * 0.35;
            const rightCol = x;
            let text3 = {
                text: "Score",
                x: x,
                y: y
            };
            textData.current.push(text3);

            // Scores
            if (scoreTable.length > 0) {
                let hiSort = scoreTable.sort((a, b) => b.score - a.score);
                for (let i = 0; i < scoreTable.length && i < fontData.current.pageLines - 2; i++) {
                    y += fontData.current.lineHeight;
                    let textA = {
                        text: hiSort[i].gameNum,
                        x: leftCol,
                        y: y
                    }
                    textData.current.push(textA);
                    let textB = {
                        text: hiSort[i].score,
                        x: rightCol,
                        y: y
                    }
                    textData.current.push(textB);
                }
            }

            setTextDataState(textData.current);
            setGotTextData(true);
        }
    }, [scoreTable, gotScaleData])
    
    return (
        <Container>
            <Row>
                <Col ref={tableCol} className="text-center">
                    {gotScaleData && gotTableData &&
                    <>
                        <Stage width={tableWidth} height={tableHeight}>
                            <Sprite
                                image={tableDataState.image}
                                scale={{x: scaleX, y: scaleY}}
                                anchor={{x: 0, y: 0}}
                                x={0}
                                y={0}
                            />
                            {gotTextData && 
                            <>
                                {textDataState.map((item, index) => 
                                    <Text
                                        key={index}
                                        text={item.text}
                                        anchor={{x: 0, y: 0}}
                                        x={item.x}
                                        y={item.y}
                                        style={{
                                            fontFamily: fontDataState.font,
                                            fontSize: fontDataState.fontSize,
                                            fill: fontDataState.fill,
                                            stroke: fontDataState.stroke
                                        }}
                                    />
                                )}
                            </>                        }
                        </Stage>
                    </>
                    }
                </Col>
            </Row>
        </Container>
    )
}