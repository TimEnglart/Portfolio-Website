import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components';


const FooterContainer = styled.footer`
  padding-top: 10px;
`;

const RedirectNavigation = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UnorderedList = styled.ul`
    margin: 0px;
    padding: 0px;
    list-style: none;
`;

const ListItem = styled.li`
  display: inline-block;
  padding: 10px 30px;
`;

const Icon = styled(FontAwesomeIcon)`
  svg {
    width: 1.5em;
    height: 1.5em;
    transition: transform .2s ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
  }
`;

const Copyright = styled.div`
  padding: 10px 0px;
  display: block;
  text-align: center;
`;

const CopyrightYear = styled.span`
  padding-left: 8px;
`;

const yearCreated = 2020, yearNow = new Date().getFullYear();

const Footer = () => {
  return <FooterContainer>
    <RedirectNavigation>
      <UnorderedList>
        <ListItem>
          <a href="https://github.com/TimEnglart"><Icon icon={faGithub} /></a>
        </ListItem>
        <ListItem>
          <a href="https://www.linkedin.com/in/tim-englart/"><Icon icon={faLinkedin} /></a>
        </ListItem>
      </UnorderedList>
    </RedirectNavigation>
    <Copyright>
      © Tim Englart
      <CopyrightYear>
        yearCreated == yearNow ? `${yearNow}` : `${yearCreated} - ${yearNow}`
      </CopyrightYear>
    </Copyright>
  </FooterContainer>
}

export default Footer;
