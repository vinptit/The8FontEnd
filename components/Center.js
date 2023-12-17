import styled from "styled-components";

const StyledDiv = styled.div`
  width: calc(100vw - 600px);
  margin: 0 auto;
  padding: 0 20px;
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}