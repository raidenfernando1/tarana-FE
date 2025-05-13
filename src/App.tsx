import styled from "@emotion/styled";
import Greet from "./pages/Greet";

const Main = {
  Container: styled.main`
    height: 100dvh;
    color: var(--txt-color);
    background-color: var(--bg-color);
  `,
};

const App = () => {
  return (
    <Main.Container>
      <Greet />
    </Main.Container>
  );
};

export default App;
