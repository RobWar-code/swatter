import {useState} from 'react';
import {
    Outlet
} from "react-router-dom";
import NavBar from '../components/NavBar';
import DataLoader from '../components/DataLoader';

export default function Root() {
    const [scoreTable, setScoreTable] = useState([]);
    const [graphicData, setGraphicData] = useState([]);
    const [dataFetchError, setDataFetchError] = useState(false);
    const [graphicDataFetched, setGraphicDataFetched] = useState(false);
    
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
                    <Outlet context={[scoreTable, setScoreTable, graphicData]}/>
                </div>
                </>
            )
        )}
        </>
    )
}