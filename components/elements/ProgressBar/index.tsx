import React from 'react';
import style from './progressbar.module.scss';

interface ProgressBarProps {
    bgColor: string;
    fillColor: string;
    percent: number;
}


const ProgressBar = (props: ProgressBarProps) => {
    const { bgColor, fillColor, percent } = props;

  const containerStyles: React.CSSProperties = {
    backgroundColor: bgColor,
  }

  const fillerStyles: React.CSSProperties = {
    width: `${percent}%`,
    backgroundColor: fillColor,
  }

//   const labelStyles: React.CSSProperties = {
//     width: '100%',
//     color: 'black',
//     fontWeight: 'bold',
//     textAlign: "center",
//     position: "absolute",
//     display: "block",
//   }

  return (
    <div style={containerStyles} className={style.progressbarbackground}>
      <div style={fillerStyles} className={style.progressbarforeground}> 
        <span className={style.progresslabel}>{`${percent.toFixed(0)}%`}</span>
      </div>
    </div>
  );
};
  
  export default ProgressBar;