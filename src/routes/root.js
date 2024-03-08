import {useEffect, useState} from 'react';
import {
    Outlet
} from "react-router-dom";
import WebFont from 'webfontloader';
import NavBar from '../components/NavBar';
import DataLoader from '../components/DataLoader';
import GLOBALS from '../constants/constants';

export default function Root() {
    const [scoreTable, setScoreTable] = useState([]);
    const [graphicData, setGraphicData] = useState([]);
    const [dataFetchError, setDataFetchError] = useState(false);
    const [graphicDataFetched, setGraphicDataFetched] = useState(false);
    const [gameNum, setGameNum] = useState(1);
    const [lastGameScore, setLastGameScore] = useState(0);
    const [gameScore, setGameScore] = useState(0);
    const [bugCount, setBugCount] = useState(GLOBALS.bugsPerGame);

    const contextVars = {
        scoreTable: scoreTable,
        setScoreTable: setScoreTable,
        gameNum: gameNum,
        setGameNum: setGameNum,
        lastGameScore: lastGameScore,
        setLastGameScore: setLastGameScore,
        gameScore: gameScore,
        setGameScore: setGameScore,
        bugCount: bugCount,
        setBugCount: setBugCount
    }
    // Font Loader
    useEffect(() => {
        WebFont.load({
            custom: {
                families: ['Kaushan'],
                urls: ['../styles/index.css']
            },
            active: () => {
                console.log("Font Loaded")
            }  
        })

    }, [])

    return (
        <>
        {dataFetchError ? (
            <h2>Problem loading graphic information file</h2>
        ) : (
            !graphicDataFetched ? (
                <DataLoader setGraphicData={setGraphicData} 
                setDataFetchError={setDataFetchError}
                setGraphicDataFetched={setGraphicDataFetched} />
            ) :
            (
                <>
                <NavBar />
                <div id="detail">
                    <Outlet context={[graphicData, contextVars]}/>
                </div>
                </>
            )
        )}
        </>
    )
}