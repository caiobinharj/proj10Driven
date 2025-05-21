import Topo from "./Topo.jsx";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filmes from "./Filmes";
import { createGlobalStyle } from 'styled-components';
import {useState} from "react";
import Sessoes from "./Sessoes";
import Assentos from "./Assentos.jsx"
import Sucesso from "./Sucesso.jsx"

    export default function App() {
        const [tudo, setTudo] = useState({idFilme:null, idSessao:null, nomeFilme:null, sessao:{dia:null, hora:null}, assentos:[], nomeComprador:null, cpf:null});
        return (
            <BrowserRouter>
                <GlobalStyle />
                <Interface>
                    <Topo />
                    <Routes>
                        <Route path="/" element={<Filmes tudo={tudo} setTudo={setTudo} />} />
                        <Route path="/sessoes/:idFilme" element={<Sessoes tudo={tudo} setTudo={setTudo} />} />
                        <Route path="/assentos/:idSessao" element={<Assentos tudo={tudo} setTudo={setTudo} />} />
                        <Route path="/sucesso" element={<Sucesso tudo={tudo} setTudo={setTudo} />} />


                    </Routes>
                </Interface>
            </BrowserRouter>
        );
    }

const Interface = styled.div`
    display: flex;
    width: 375px;
    flex-direction: column;
    background-color: yellow;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background: white;
  }

  button, a {
    cursor: pointer;
  }
`;