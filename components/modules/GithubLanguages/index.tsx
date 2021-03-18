import style from './githulanguages.module.scss'
import GithubUserLanguages, { IGithubLanguages, IGithubLanguagesModel } from '@/api/models/GithubUserLanguages'
import { CSSProperties, HTMLProps, useEffect, useState } from 'react';
import mongoose, { Document } from 'mongoose'

import styled from 'styled-components';
import { IGithubLanguage } from '@/pages/api/github/languages/colors';


interface IProps extends HTMLProps<any> {
    sortMethod?: "Bytes" | "Projects" | "Name";
    sort?: "asc" | "desc";
}

interface MyCustomCSS extends CSSProperties {
    '--my-css-var': string;
}



function GithubLanguages(props: IProps) {

    const [languages, setLanguages] = useState<IGithubLanguages[]>([]);

    const [loading, setLoading] = useState(true);

    const [sortMethod, setSortMethod] = useState("Bytes");

    const [githubColors, setGithubColors] = useState<IGithubLanguage>({});

    async function getLanguages(amount = 3, start = 0) {
        setLoading(true);
        const records = await fetch(`/api/github/languages/stats`); //?amount=${amount}&start=${start}`);
        const languages = await records.json();

        const gitColors = await fetch(`/api/github/languages/colors`);
        const colorsJson = await gitColors.json();

        setGithubColors(colorsJson);
        setLanguages(languages);


        setLoading(false);
    }

    function formatBytes(bytes: number, decimals?: number): string {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function sort(value1: IGithubLanguages, value2: IGithubLanguages): number {
        const sortDesc = (props.sort || "desc") === "desc"
        function compareString(a: string, b: string): number {
            for (let i = 0; i < Math.min(a.length, b.length); i++) {
                if (a[i] !== b[i]) {
                    if (sortDesc)
                        return a[i] < b[i] ? -1 : 1;
                    else
                        return a[i] < b[i] ? 1 : -1;
                }
            }
            if (a.length === b.length)
                return 0;
            if (sortDesc)
                return a.length < b.length ? -1 : 1;
            else
                return a.length < b.length ? 1 : -1;
        }
        function compareNumber(a: number, b: number): number {
            if (sortDesc)
                return a > b ? -1 : 1;
            else
                return a > b ? 1 : -1;
        }


        switch (props.sortMethod) {
            case "Bytes":
                return compareNumber(value1.bytes, value2.bytes);
            case "Name":
                return compareString(value1._id, value2._id);
            case "Projects":
                return compareNumber(value1.projects, value2.projects);
            default:
                return 0;
        }
    }

    useEffect(() => {
        getLanguages();
    }, []);

    return <div className={style.grid}>
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
            languages.sort(sort).map(languageData => (
                <div className={style.card} key={languageData._id}>
                    <h3 style={{ color: githubColors[languageData._id].color }}>{languageData._id}</h3>
                    <ProgressContainer color={githubColors[languageData._id].color} className={style.progress_conatiner}>
                        <progress value={languageData.percent > 2 ? languageData.percent : 2} max={100} className={style.progress} />
                    </ProgressContainer>
                    <h3><em>{languageData.percent.toFixed(0)}%</em> of Source Code in my Github Repos</h3>
                    <h3><em>{languageData.projects}</em> Project Implementations</h3>
                    <h3><em>{formatBytes(languageData.bytes)}</em> of Sorce Code</h3>
                </div>
            ))
        }
        {
            loading &&
            <h1>
                Loading...
            </h1>
        }

    </div>
}

const ProgressContainer = styled.div`
    progress[value] {
        color: ${props => props.color};
        ::-moz-progress-bar,  { 
            background: ${props => props.color}; 
        }
        ::-webkit-progress-value { 
            background: ${props => props.color}; 
        }
    }`
export default GithubLanguages;