import style from './githulanguages.module.scss'
import IGithubLanguageSchema from '@/api/models/GithubUserLanguages'
import { CSSProperties, HTMLProps, useEffect, useMemo, useState } from 'react';
import mongoose, { Document } from 'mongoose'

import styled from 'styled-components';
import { IGithubLanguage } from '@/pages/api/github/languages/colors';


import ProgressBar from '@/components/elements/ProgressBar';
import React from 'react';

type SortDirection = "asc" | "desc";
interface IProps extends HTMLProps<any> {
    sortMethod?: "Bytes" | "Projects" | "Name";
    sort?: "asc" | "desc";
}

const LanguageContainer = styled.div`
display: flex;
align - items: center;
justify - content: center;
flex - wrap: wrap;
margin - top: 3rem;

@media(max - width: 600px) {
    width: 100 %;
    flex - direction: column;
}
`;


function GithubLanguages(props: IProps) {

    const [languages, setLanguages] = useState<IGithubLanguageSchema[]>([]);

    const [loading, setLoading] = useState(true);

    const [sortMethod, setSortMethod] = useState("Bytes");

    const [githubColors, setGithubColors] = useState<IGithubLanguage>({});

    async function getLanguages(amount = 3, start = 0) {
        setLoading(true);
        const records = await fetch(`/ api / github / languages / stats`); //?amount=${amount}&start=${start}`);
        const languages = await records.json();

        const gitColors = await fetch(`/api/github/languages/colors`);
        const colorsJson = await gitColors.json();

        setGithubColors(colorsJson);
        setLanguages(languages);


        setLoading(false);
    }

    function sort(value1: IGithubLanguageSchema, value2: IGithubLanguageSchema): number {
        const sortDesc = (props.sort || "desc") === "desc"
        function compareString(a: string, b: string): number {
            for (let i = 0; i < Math.min(a.length, b.length); i++) {
                if (a[i] !== b[i]) {
                    return compareNumber(a.charCodeAt(i), b.charCodeAt(i));
                }
            }
            compareNumber(a.length, b.length);
        }
        function compareNumber(a: number, b: number): number {
            return a - b * (sortDesc ? -1 : 1);
        }


        switch (props.sortMethod) {
            case "Bytes":
                return compareNumber(value1.bytes, value2.bytes);
            case "Name":
                return compareString(value1._id, value2._id);
            // case "Projects":
            //     return compareNumber(value1.projects, value2.projects);
            default:
                return 0;
        }
    }



    useEffect(() => {
        getLanguages();
    }, []);

    const cards = languages.sort(sort).map(languageData => <LanguageCard language={languageData} color={githubColors[languageData._id].color} key={languageData._id} />);

    return (
        //!loading &&

        <LanguageContainer>
            {
                // Most Used Programming Languages

                /*
                    EXAMPLE LAYOUT
            
                    Typescript      [============-------] 60.2% (▽ Expand)
    
                        Total Bytes Written in Language: x
                        Project Implementations: x  
    
    
                    C#              [=======------------] 25.8%
            
                                        
                                        (▽ Load More)
            
            
            
                    Progress Bar Colored to Github Programming Color
                    Load X Amount (5) then make user press button to get more
                */
            }
            {
                cards
            }
            {
                loading &&
                <h1>
                    Loading...
                </h1>
            }

        </LanguageContainer>);
}


const StyledLanguageCard = styled.div`
    margin: 1rem;
    flex-basis: 35%;
    padding: 1.5rem;
    margin: 1rem 5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    text-align: center;
    &:hover,
    &:focus,
    &:active {
      color: #0070f3;
      border-color: #0070f3;
    }
`;

const LanguageCardTitle = styled.h3`
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: ${props => props.color};
`;

const LanguageInfo = styled.p`
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    line-height: 1.5;
`;

interface LanguageCardProps {
    language: IGithubLanguageSchema;
    color: string;
}

const languageCardBgColor = "#A9A9A9";

const formatBytes = (bytes: number, decimals?: number): string => {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const LanguageCard = (props: LanguageCardProps) => {
    const { language, color } = props;
    const formattedBytes = useMemo(() => { console.log(`formatting the bytes for: ${language._id}`); return formatBytes(language.bytes) }, [language.bytes]);

    return <StyledLanguageCard>
        <LanguageCardTitle>{language._id}</LanguageCardTitle>

        <ProgressBar fillColor={color} bgColor={languageCardBgColor} percent={(language.percent)} />

        <LanguageInfo><em>{language.percent.toFixed(0)}%</em> of Source Code in my Github Repos</LanguageInfo>
        <LanguageInfo><em>{language.projects}</em> Project Implementations</LanguageInfo>
        <LanguageInfo><em>{formattedBytes}</em> of Source Code</LanguageInfo>
    </StyledLanguageCard>
};

export { GithubLanguages };
export default GithubLanguages;
