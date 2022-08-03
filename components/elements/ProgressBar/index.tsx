import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  bgColor: string;
  fillColor: string;
  percent: number;
}

interface ProgressBarBackgroundProps {
  backgroundColor: string;
}

const ProgressBarBackground = styled.div<ProgressBarBackgroundProps>`
  background-color: ${(props) => props.backgroundColor};
  position: relative;
  height: 20px;
  width: 100%;
  border-radius: 50px;
  margin: 12px 0px;
`;

type ProgressBarForegroundProps = ProgressBarBackgroundProps & { width: string };

const ProgressBarForeground = styled.div<ProgressBarForegroundProps>`
  height: 100%;
  border-radius: inherit;
  text-align: right;

  width: ${props => props.width};
  background-color: ${props => props.backgroundColor};
`;

const ProgessBarLabel = styled.span`
  display: block;
  position: absolute;
  
  width: 100%;
  color: black;
  font-weight: bold;
  text-align: center;
`;


const ProgressBar = (props: ProgressBarProps) => {
  const { bgColor, fillColor, percent } = props;

  return (
    <ProgressBarBackground backgroundColor={bgColor}>
      <ProgressBarForeground backgroundColor={fillColor} width={`${percent}%`}>
        <ProgessBarLabel>
          {`${percent.toFixed(0)}%`}
        </ProgessBarLabel>
      </ProgressBarForeground>
    </ProgressBarBackground>
  );
};

export { ProgressBar }
export default ProgressBar;
