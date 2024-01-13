import React from "react";
import { Container, Typography } from "@mui/material";
import { StyledButton, Title } from "../StyledElements";

const Instructions = ({ nextPage }) => {
    return (
        <Container component="main" maxWidth="md" align="center">
            <Title text="STUDY INSTRUCTIONS" />

            <Typography component="h2" variant="h6" align="left">
                <br />
                The main goal of this survey is to understand how we form impressions about people while listening to them speak.
                <br />
                <br />
                You will listen to a series of English speech samples.
                For each audio recording that you hear, please type and submit at least one (but up to five)
                trait impressions of the speaker that come to mind as you listen to the recording. 
                <br />
                <br />
                You might receive alerts about your responses during the experiment. Please do not disable
                these alerts; they are necessary to complete the survey.
                <br />
                <br />
                What is a trait? Traits are individual 
                characteristics that endure across time. A "trait" is different from a "state," which describes a 
                temporary experience. An example of a trait is "kind," while an example of a state
                would be "startled." Feel free to list emotions (e.g., "cheerful"), but only if you believe that 
                emotion describes the speaker's enduring trait rather than their temporary emotional state.
            </Typography>

            <StyledButton handleClick={nextPage} text="Begin Study" />
        </Container>
    );
};

export default Instructions;