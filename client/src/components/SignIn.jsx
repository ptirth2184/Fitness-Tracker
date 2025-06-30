import React from "react";
import styled from "styled-components";
import TexxtInput from './TextInput'
import Button from './Button'


const Container = styled.div`
    width:100%;
    max-width:500px;
    display: flex;
    flex-direction: column;
    gap:36px;
`
const Title = styled.div`
    font-size: 30px;
    font-Weight: 800;
    color: ${({ theme }) => theme.text_primary}
`
const Span = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 90}
`

const SignIn =() =>{
    return(<>
        <Container>
            <div>
                <Title>Welcome to FitTrack👋</Title>
                <Span>Please Login with your details here</Span>
            </div>
            <div style={{
                display:"flex",
                gap:'20px',
                flexDirection: 'column'
            }}>
                <TexxtInput label='Email Address' placeholder='Enter your Email Address'/>
                <TexxtInput label='Email Passward' placeholder='Enter your Password' password/>

                <Button text='SignIn'/>
            </div>
        </Container>
    </>)
}

export default SignIn