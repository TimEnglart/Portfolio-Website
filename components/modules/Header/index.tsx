import React from 'react';
import style from './header.module.scss';
import Link from 'next/link'

export default class Header extends React.Component {
    render() {
      return (
      <header className={style.header}>
          <h2>Tim Englart</h2>
          <nav>
              <ul>
                  <li><Link href="/"><a>Home</a></Link></li>
                  <li><Link href="/about"><a>About</a></Link></li>
                  <li><Link href="/projects"><a>Projects</a></Link></li>
                  <li><Link href="/github"><a>Github</a></Link></li>
              </ul>
          </nav>
      </header>

      );
    }
}