import React from 'react';
import style from './footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'


const yearCreated = 2020, yearNow = new Date().getFullYear();
export default class Footer extends React.Component {

    render() {
      return (
        <footer className={style.footer}>
          <nav>
            <ul>
                <li><a href="https://github.com/TimEnglart"><FontAwesomeIcon icon={faGithub} className={style.icon}/></a></li>
                <li><a href="https://www.linkedin.com/in/tim-englart/"><FontAwesomeIcon icon={faLinkedin}/></a></li>
                {/*<li><a href=""><FontAwesomeIcon icon={faCoffee}/></a></li>*/}
            </ul>
          </nav>
          <div className={style.copyright}>
          © Tim Englart<span className={style.year}>{ 
          
          yearCreated == yearNow ? `${yearNow}` : `${yearCreated} - ${yearNow}`
          
          }</span>
          </div>
        </footer>
      );
    }
}