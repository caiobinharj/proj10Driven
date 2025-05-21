import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Assentos({ setTudo }) {
    const { idSessao } = useParams();
    const navigate = useNavigate();
    const [assentos, setAssentos] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
            .then(response => {
                setAssentos(response.data.seats);
            })
            .catch(error => {
                console.log("Erro ao carregar assentos:", error);
            });
    }, [idSessao]);

    const selecionarAssento = (assento) => {
        if (!assento.isAvailable) {
            return alert("Assento indisponível");
        }

        const jaSelecionado = selecionados.includes(assento.id);

        if (jaSelecionado) {
            setSelecionados(selecionados.filter(id => id !== assento.id));
        } else {
            setSelecionados([...selecionados, assento.id]);
        }
    };

    const atualizarNome = (e) => {
        setNome(e.target.value);
    };

    const atualizarCpf = (e) => {
        setCpf(e.target.value);
    };

    const fazerReserva = () => {

        axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: selecionados,
            name: nome,
            cpf: cpf
        })
            .then(() => {
                setTudo(prevState => ({
                    ...prevState, // Mantém todas as propriedades existentes
                    assentos: selecionados,
                    nomeComprador: nome,
                    cpf: cpf
                }));
                navigate("/sucesso");
            })
            .catch(() => {
                alert("Erro ao reservar");
            });
    };

    const linhas = [];
    for (let i = 0; i < assentos.length; i += 10) {
        linhas.push(assentos.slice(i, i + 10));
    }

    return (
        <Corpo>
            <Titulo>Selecione os assentos</Titulo>

            <GradeAssentos>
                {linhas.map((linha, i) => (
                    <Linha key={i}>
                        {linha.map(assento => (
                            <Assento
                                key={assento.id}
                                disponivel={assento.isAvailable}
                                selecionado={selecionados.includes(assento.id)}
                                onClick={() => selecionarAssento(assento)}
                            >
                                {assento.name}
                            </Assento>
                        ))}
                    </Linha>
                ))}
            </GradeAssentos>

            <DadosReserva>
                <Campo>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={atualizarNome}
                        placeholder="Seu nome completo"
                    />
                </Campo>
                <Campo>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={atualizarCpf}
                        placeholder="Somente números"
                        maxLength="11"
                    />
                </Campo>
            </DadosReserva>

            <Botao onClick={fazerReserva}>
                Reservar assento(s)
            </Botao>
        </Corpo>
    );
}

const Corpo = styled.div`
    background: #212226;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Titulo = styled.p`
    color: white;
    font-size:24px;
    font-family: 'Sarala', sans-serif;
    margin: 20px 0;
`;

const GradeAssentos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
`;

const Linha = styled.div`
    display: flex;
    gap: 8px;
`;

const Assento = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    background: ${({ disponivel, selecionado }) =>
            !disponivel ? '#666' :
                    selecionado ? '#FFD700' : '#4CAF50'};
    border: 1px solid ${({ disponivel, selecionado }) =>
            !disponivel ? '#333' :
                    selecionado ? '#FFA500' : '#2E7D32'};
`;

const DadosReserva = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 350px;
    margin-bottom: 20px;
`;

const Campo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
        color: white;
        font-family: 'Sarala', sans-serif;
    }

    input {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
`;

const Botao = styled.button`
    padding: 12px 30px;
    background: #E8833A;
    color: white;
    border: none;
    border-radius: 4px;
    font-family: 'Sarala', sans-serif;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #D97634;
    }
`;