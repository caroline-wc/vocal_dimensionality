import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
    Container,
    Typography,
    TextField
} from "@mui/material";
import { StyledButton } from "../StyledElements";
import ProgressBar from "@ramonak/react-progress-bar";

//add anything inherited from experiment as a parameter to use it here
function GenerateImpression({ nextPage, stimOrder, responses, setResponses }) {
    // initialize states (aka stuff i need to run the trials)
    const [trial, setTrial] = useState(0);
    const [stim, setStim] = useState(stimOrder[0]);
    const [RT, setRT] = useState(Date.now());
    const [text, setText] = useState([
        {
          id: 1,
          value: ""
        },
        {
          id: 2,
          value: ""
        },
        {
          id: 3,
          value: ""
        },
        {
            id: 4,
            value: ""
        },
        {
            id: 5,
            value: ""
        }
      ])
    const [responseEntered, setResponseState] = useState(false);
    const [audioPlayed, setAudioPlayed] = useState(false);

    // this will not count empty strings as duplicates
    const getDuplicates = inputArray => inputArray.filter((item, index) => {
        const isNotEmpty = item.value.trim() !== "";
        return isNotEmpty && inputArray.findIndex(i => i.value === item.value) !== index;
    });
    
    const nextTrial = () => {
        
        // move to the next audio only if...

        // the audio recording has been played in full
        if (!audioPlayed) {
            alert("Please listen to the audio in full before moving on.");
        } 

        // a response at least 3 characters long has been entered in the first text field
        else if (text[0].value.length < 3) {
            alert("Please enter at least one complete trait in text box 1. Make sure your response is at least 3 characters long.");
        }

        // all submitted text field responses are at least 3 characters long
        else if (!(text.slice(1,5).every(item => {return (item.value.length==0 || item.value.length>=3)}))) {
            alert("Please make sure each response is at least 3 characters long.");
        }

        // there are no duplicate responses
        else if (getDuplicates(text).length !== 0) {
            alert("Please make sure each response is unique.");
        }

        else {
            setTrial(trial + 1);
            sendTrialData();
            setRT(Date.now());
            window.scrollTo(0, 0);
        }
    };

    const sendTrialData = () => {
        setResponses([
            ...responses,
            { trial: trial, stim: stim, textResponses: text, RT: Date.now() - RT },
        ]);
    };
   
    const prepTrial = () => {
        setStim(stimOrder[trial]);
        setText([
            {
              id: 1,
              value: ""
            },
            {
              id: 2,
              value: ""
            },
            {
              id: 3,
              value: ""
            },
            {
                id: 4,
                value: ""
            },
            {
                id: 5,
                value: ""
            }
          ]);
        setResponseState(false);
        setAudioPlayed(false);
    };

    const handleChange = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        /* Runs only when trial updates */
        if (trial === stimOrder.length) {
            nextPage();
        } else {
            prepTrial();
        }
    }, [trial]);

    const handleTextResponses = (e, id) => {
        setResponseState(true);
     
        // allow only letters
        const alphaValue = e.target.value.replace(/[^A-Za-z]/g, "");
        var textResponsesCopy = [...text]; // duplicate copy of text responses
        textResponsesCopy = textResponsesCopy.map((textBox) => { //<- use map on result to find element to update using id
          if (textBox.id === id) textBox.value = alphaValue;
          return textBox;
        });
        setText(textResponsesCopy); //<- update roomRent with value edited 
    };

    return (
        <div>
            <ProgressBar
                completed={trial}
                bgColor="green"
                animateOnRender={true}
                isLabelVisible={false}
            />
            <Container component="main" maxWidth="md" align="center">
                <br /> <br />
                <br /> <br />
                <Typography fontSize="21px">
                    Please listen to the audio recording and list the enduring
                    trait(s) you think this speaker has.
                </Typography>
                <ReactPlayer
                    
                    url={`./filtered_audio/${stim}`}

                    // the below url is for development
                    //url={`vocal_impressions/filtered_audio/${stim}`}

                    onEnded={(e) => setAudioPlayed(true)}
                    controls={true}
                    style={{ position: "absolute", top: -130, left: "28%" }}
                    config={{
                        file: {
                            attributes: {
                                controlsList: "nodownload noplaybackrate",
                            },
                        },
                    }}
                />
                <br />
                <br /> <br />
                <br /> <br />
                <br /> <br />
                <Typography align="left" component="h1" variant="h6">
                    <strong>
                        {" "}
                        Please add at least 1, but up to 5 trait(s) of the
                        speaker:
                    </strong>
                    <br /> <br />
                </Typography>
                <Container maxWidth="md" align="left">
                    {text.map((box, index) => {
                        return (
                            <div key={index}>
                                <label> 
                                    <TextField
                                        id={box.id}
                                        value={box.value} // refers textbox 0,1,2 etc 
                                        required={true}
                                        placeholder="Trait"
                                        type="string"
                                        inputProps={{ style: { fontSize: 19 }, autoComplete: 'new-password' }} // prevent autofill
                                        disabled={!audioPlayed}
                                        style={{ width: 200, padding:5}}
                                        onPaste = {handleChange} // prevent copying/pasting
                                        onCopy = {handleChange}
                                        onCut = {handleChange}
                                        variant="standard"
                                        color="success"
                                        onChange={(e) => {
                                            handleTextResponses(e, index+1);
                                        }}
                                    />
                                </label>
                            </div>
                        )
                    })}
                </Container>
                <br /> <br />
                <br /> <br />
                <StyledButton handleClick={nextTrial} text="NEXT" />
            </Container>
        </div>
    );
}

export default GenerateImpression;
