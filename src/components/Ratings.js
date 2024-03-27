import React, { useState, useEffect } from "react";
import { Container, Typography, LinearProgress } from "@mui/material";
import { StyledButton, StyledSlider } from "../StyledElements";
import ReactPlayer from "react-player";

/*
<Typography variant="h4" padding="00%" marginTop="20px" align="right" justifyContent='space-between'>
                    <strong> extremely {currTerm}</strong> 
                </Typography>

<Typography variant="h4" padding="00%" marginTop="20px" align="left" justifyContent='space-between'>
                    <strong> not at all {currTerm}</strong> 
                </Typography>
*/



function Ratings({ termOrder, stimOrder, nextPage, responses, setResponses }) {
    const [trialNum, setTrialNum] = useState(0);
    const [currTerm, setCurrTerm] = useState(termOrder[0]);
    const [stim, setStim] = useState(stimOrder[0]);
    const [RT, setRT] = useState(Date.now());
    const [slider, setSlider] = useState({
        value: 0,
        moved: false,
    });
    const [audioPlayed, setAudioPlayed] = useState(false);

    const setTrial = () => {
        /* Resetting states (RT, new stim, slider values) for the new trial */
        setRT(Date.now());
        setCurrTerm(termOrder[trialNum]);
        //new
        setStim(stimOrder[trialNum]);
        setSlider({ value: 0, moved: false });
    };

    const nextTrial = () => {
        
        // move to the next audio only if...

        // the audio recording has been played in full
        if (!audioPlayed) {
            alert("Please listen to the audio in full before moving on.");
        } 

        else if (!slider.moved) {
            alert(
                "Please move the slider from its default position to continue, even if your response is 0."
            );
        }
        
        /*
            Record responses and move to the next trial only if the ratings slider has been moved
            If not, display an alert 
        */
        else {
            setResponses([
                ...responses,
                {
                    trial: trialNum,
                    term: currTerm,
                    stim: stim,
                    rating: slider.value,
                    RT: Date.now() - RT,
                },
            ]);
            setTrialNum(trialNum + 1);
            setAudioPlayed(false);
            window.scrollTo(0, 0);

        }
    };

    const handleSlider = (e, newValue) => {
        /* 
            Record new slider value and that it has been interacted with
            Users cannot proceed to the next trial without moving the slider
            from its default position 
        */
        setSlider({ value: newValue, moved: true });
    };

    useEffect(() => {
        /* Runs only when trialNum updates */
        if (trialNum === termOrder.length) {
            nextPage();
        } else {
            setTrial();
        }
    }, [trialNum]);

    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={(trialNum / termOrder.length) * 100}
                sx={{
                    height: 10,
                    backgroundColor: `#c7d1bc`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: `#165806`,
                    },
                }}
            />
            <Container component="main" maxWidth="md" align="center">
                <Typography variant="h4" padding="3%" marginTop="20px">
                    Please listen to the audio recording and use the slider to rate:
                    How <strong> {currTerm} </strong> is the speaker?
                </Typography>

                <ReactPlayer
                    
                    url={`./filtered_audio/${stim}`}

                    // the below url is for development
                    //url={`trait_ratings/filtered_audio/${stim}`}

                    onEnded={(e) => setAudioPlayed(true)}
                    controls={true}
                    style={{ position: "absolute", top: -110, left: "28%" }}
                    config={{
                        file: {
                            attributes: {
                                controlsList: "nodownload noplaybackrate",
                            },
                        },
                    }}
                />

                <br />  <br />
                <br />  <br />
                <br />  <br />


                <Typography
                    style={{
                        color: "rgb(33,37,40)",
                        textAlign: "left",
                        fontSize: "30px",
                        paddingTop: "1%",
                    }}
                    component="h4"
                    variant="h5"
                >
                    <strong>
                        <span style={{ float: "left" }}>
                            not at all {currTerm}
                        </span>
                        <span style={{ float: "right" }}>
                            extremely {currTerm}
                        </span>
                    </strong>
                </Typography>

                <StyledSlider
                    value={slider.value}
                    valueLabelDisplay="off"
                    onChange={handleSlider}
                    min={-50}
                    max={50}
                    style={{ marginTop: "20px" }}
                />


            

                <StyledButton handleClick={nextTrial} text="NEXT" />
            </Container>
        </div>
    );
}

export default Ratings;