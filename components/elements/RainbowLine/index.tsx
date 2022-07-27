import styled, { keyframes } from 'styled-components';


const slideKeyframe = keyframes`
@keyframes slide {
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 600vw;
    }
}`;


const RainbowBar = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 3px;
  user-select: none;
  transform: rotateZ(360deg);
  background: repeating-linear-gradient(-45deg, red 0%, yellow 7.14%, rgb(0,255,0) 14.28%,
              rgb(0,255,255) 21.4%, cyan 28.56%, blue 35.7%, magenta 42.84%, red 50%);
  background-size: 600vw 3px;
  animation: ${slideKeyframe} 10s linear infinite forwards;
`;

export default RainbowBar;
