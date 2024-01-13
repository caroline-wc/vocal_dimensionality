import React, {useState} from "react";
import { Container, Typography } from "@mui/material";
import { StyledButton, Title } from "../StyledElements";
import ReactPlayer from "react-player"; 
import testAudio from "../audio/YAF_book_neutral.wav"; 

function AudioTest({ nextPage }) {
    const [audioPlayed, setAudioPlayed] = useState(false); 

    const validateResponses = () => {
        if (audioPlayed){ // if the audio has already been played
            nextPage(); // go to the next step, that is the actual task 
        }
        else {
            alert("Please listen to the audio in full before moving on.");
        }
    };
    
    return (
        <Container component="main" maxWidth="md" align="center">
            <Title text="AUDIO TEST" />

            <Typography component="h2" variant="h6" align="center">
                <br />
                <br />
                Find a quiet space to complete this study where you will be able to 
                focus and clearly hear the audio samples. If possible, wear headphones or
                earbuds. You should complete this survey with the window in full-screen display.
                <br />
                <br />
                <br />
                Listen to the audio clip below. If you are unable to hear the audio, 
                please check your speaker to make sure it is working properly before 
                proceeding with the study.
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <strong> Audio Transcript: </strong>
                <br />
                "Say the word 'book.'"
            </Typography>
            <br />
            <br />
            <ReactPlayer url={testAudio} onEnded= {e => setAudioPlayed(true)} controls={true} style={{position:"absolute",top: 140,left:"28%"}} config={{ file: {attributes: {controlsList: "nodownload noplaybackrate"}}}}/> 
            <StyledButton handleClick={validateResponses} text="Next Page" />
        </Container>
    );
};

export default AudioTest;