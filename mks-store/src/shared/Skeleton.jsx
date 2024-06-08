import styled, { keyframes } from "styled-components";

// Defina a animação de rotação da bolinha
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Estilize o contêiner que ocupa toda a tela
const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Adicione um fundo semitransparente para uma melhor aparência */
`;

// Estilize a bolinha
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0f52ba;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotateAnimation} 1s linear infinite; // Aplica a animação de rotação
`;

const Skeleton = () => {
  return (
    <FullScreenContainer>
      <Spinner />
    </FullScreenContainer>
  );
};

export default Skeleton;
