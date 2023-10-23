import { styled } from "styled-components";

export default function IncompleteRegistration() {

    return (
        <>
            <StyledDiv>
                <h1>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h1>
            </StyledDiv>
        </>
    );
}

const StyledDiv = styled.div`

    h1{ 
        margin-top: 250px;
        margin-left: 120px;
        width: 600px;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: center;
        color: #8E8E8E;
    }
`
