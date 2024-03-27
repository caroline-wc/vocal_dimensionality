import React, { useState } from "react";
import Consent from "./Consent";
import Instructions from "./Instructions"
import AudioTest from "./AudioTest"
import DemoSurvey from "./DemoSurvey";
//import GenerateImpression from "./AudioTask";
import Debrief from "./Debrief";
import stimOrder from "./Stim";
import termOrder from "./Term";
import Ratings from "./Ratings";
import db from "./DataBase";
import { v4 as uuidv4 } from "uuid";
import { ref, set } from "firebase/database";

function Experiment() {
    const subID = useState(uuidv4());
    const [page, setPage] = useState(1);
    const [responses, setResponses] = useState([]);
    // {stim: x, trial: 0, textresponses: {0: 1: 2:...}, RT: }
    const [demoData, setDemoData] = useState({
        age: "",
        education: "",
        gender: "",
        sex: "",
        ethnicity: "",
        race: [],
    });

    const nextPage = () => {
        window.scrollTo(0,0); 
        setPage(page + 1);
    }

    const writeData = () => {
        set(ref(db, subID[0]), {
            responses: responses,
            demo: demoData,
        });
    };

    const conditionalComponent = () => {
        switch (page) {
            case 1:
                return <Consent nextPage={nextPage} />;
    
            case 2:
                return <Instructions nextPage={nextPage} />;
            case 3:
                return <AudioTest nextPage={nextPage} />;
            case 4:
                return (
                    <Ratings
                        nextPage={nextPage}
                        stimOrder={stimOrder}
                        termOrder={termOrder}
                        responses={responses}
                        setResponses={setResponses}
                    />
                );
            
            case 5:
                return (
                    <DemoSurvey 
                        nextPage={nextPage} 
                        demoData={demoData}
                        setDemoData={setDemoData}
                    />
                );
            
            case 6:
                return (
                    <Debrief 
                        nextPage={nextPage} 
                        writeData={writeData}
                        subID={subID}
                    />
                );
                
            default: None;
            
        }
    };

    return <div> {conditionalComponent()}</div>;
}

export default Experiment;
