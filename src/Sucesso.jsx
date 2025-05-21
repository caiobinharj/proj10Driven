import styled from "styled-components";

export default function Sucesso({ tudo }) {
    console.log("Dados recebidos:", tudo); // Para debug

    return (
        <Corpo>
            <ContainerTexto>
                <Texto1>Pedido finalizado!</Texto1>
            </ContainerTexto>

            {tudo && (
                <ConteinerFinal>
                    <Texto2>Filme e sessão</Texto2>
                    <Texto3>
                        <p><strong>Filme:</strong> {tudo.nomeFilme || "Não informado"}</p>
                        <p><strong>Data:</strong> {tudo.sessao?.dia || "Não informado"}</p>
                        <p><strong>Horário:</strong> {tudo.sessao?.hora || "Não informado"}</p>
                    </Texto3>

                    <Texto2>Ingressos</Texto2>
                    <Texto3>
                        {tudo.assentos?.length > 0 ? (
                            tudo.assentos.map((assento, index) => (
                                <p key={index}><strong>Assento:</strong> {assento.id || assento}</p>
                            ))
                        ) : (
                            <p>Nenhum assento selecionado</p>
                        )}
                    </Texto3>

                    <Texto2>Comprador(a)</Texto2>
                    <Texto3>
                        <p><strong>Nome:</strong> {tudo.nomeComprador || "Não informado"}</p>
                        <p><strong>CPF:</strong> {tudo.cpf || "Não informado"}</p>
                    </Texto3>
                </ConteinerFinal>
            )}
        </Corpo>
    )
}

// Estilos mais compactos
const Corpo = styled.div`
    background-color: #212226;
    min-height: 100vh;
    padding: 20px;
`;

const ContainerTexto = styled.div`
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Texto1 = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
`;

const Texto2 = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;

`;

const Texto3 = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 24px;


`;

const ConteinerFinal = styled.div`
    padding: 0 10px;
`;