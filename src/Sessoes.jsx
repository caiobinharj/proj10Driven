import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sessoes({ tudo, setTudo }) {
    const { idFilme } = useParams();
    const [sessoes, setSessoes] = useState([]);

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
            .then(response => {
                setSessoes(response.data.days);
                setTudo(prev => ({
                    ...prev,
                    idFilme: idFilme,
                    nomeFilme: response.data.title
                }));
            })
            .catch(error => console.log(error.response.data));
    }, [idFilme, setTudo]);

    const handleSelectSession = (sessionId, day, time) => {
        setTudo(prev => ({
            ...prev,
            idSessao: sessionId,
            sessao: {
                dia: day,
                hora: time
            }
        }));
    };

    return (
        <Corpo>
            <ContainerTexto>
                <Texto>Selecione o horário</Texto>
            </ContainerTexto>

            <CardapioSessoes>
                {sessoes.map((dia) => (
                    <ContainerDia key={dia.id}>
                        <Dia>
                            {dia.weekday} - {dia.date}
                        </Dia>
                        <Horarios>
                            {dia.showtimes.map((sessao) => (
                                <Link
                                    key={sessao.id}
                                    to={`/assentos/${sessao.id}`}
                                >
                                    <SessaoButton
                                        onClick={() => handleSelectSession(
                                            sessao.id,
                                            dia.date,
                                            sessao.name
                                        )}
                                    >
                                        {sessao.name}
                                    </SessaoButton>
                                </Link>
                            ))}
                        </Horarios>
                    </ContainerDia>
                ))}
            </CardapioSessoes>
        </Corpo>
    );
}

// Estilos (mantidos os mesmos com pequenos ajustes)
const Corpo = styled.div`
    background-color: #212226;
    min-height: 100vh;
    padding-bottom: 20px;
`;

const ContainerTexto = styled.div`
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Texto = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 24px;
`;

const CardapioSessoes = styled.div`
    padding: 0 24px;
`;

const ContainerDia = styled.div`
    margin-bottom: 30px;
`;

const Dia = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 15px;
`;

const Horarios = styled.div`
    display: flex;
    gap: 8px;
`;

const SessaoButton = styled.button`
    width: 83px;
    height: 43px;
    background: #E8833A;
    border-radius: 3px;
    border: none;
    color: white;
    font-family: 'Sarala', sans-serif;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        filter: brightness(0.9);
    }
`;