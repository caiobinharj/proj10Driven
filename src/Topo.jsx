import styled from "styled-components";

export default function Topo(){

    return(
        <Titulo>
            <Clap src="/clapperboard.png" alt="Clapper board"/>
            <Escrita>Cineflex</Escrita>
        </Titulo>
    )
}


const Titulo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 67px;
    background-color: #EE897F;
`

const Escrita = styled.p`
    font-family: 'Raleway', sans-serif;
    color: #FADBC5;
    font-size:34px;
`
const Clap = styled.img`
    margin-bottom: 10px;
    margin-right: 10px;
    width:40px;
    height:40px;`