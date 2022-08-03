import React from 'react';
import style from './header.module.scss';
import Link from 'next/link'
import styled from 'styled-components';

const HeaderContainer = styled.header`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

const HeaderTitle = styled.h2`
    margin: 10px 30px;
    margin-right: auto;
`;

const Navbar = styled.nav`
    margin-right: 10%;
`;

const UnorderedList = styled.ul`
    list-style: none;
`;

const ListItem = styled.li`
    display: inline-block;
    padding: 0px 20px;
`;

const LabelAnchor = styled.a`
    text-decoration: none;
    position: relative;
    padding: 8px 10px;

    &:hover {
        color: #E32;
        &::before {
            visibility: visible;
            transform: scaleX(1);
        }
    }

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        visibility: hidden;
        transform: scaleX(0);
        background: dimgray;
        transition: all 0.3s ease-in-out 0s;
    }
`;

const Header = () => {
    return <HeaderContainer>
        <HeaderTitle>Tim Englart</HeaderTitle>
        <Navbar>
            <UnorderedList>
                <ListItem>
                    <Link href="/"><LabelAnchor>Home</LabelAnchor></Link>
                </ListItem>
                <ListItem>
                    <Link href="/about"><LabelAnchor>About</LabelAnchor></Link>
                </ListItem>
                <ListItem>
                    <Link href="/projects"><LabelAnchor>Projects</LabelAnchor></Link>
                </ListItem>
                <ListItem>
                    <Link href="/github"><LabelAnchor>Github</LabelAnchor></Link>
                </ListItem>
            </UnorderedList>
        </Navbar>
    </HeaderContainer>
};

export { Header };
export default Header;
