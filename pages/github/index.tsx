import Head from 'next/head'
import styles from '@/styles/Github.module.scss'
import GithubLanguages from '@/components/modules/GithubLanguages'
import styled from 'styled-components'
import { MouseEvent, useRef, useState } from 'react'




export default function Github() {
    const [buttonText, setButtonText] = useState("Update Statistics");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("")


    const githubLanguageComponent = useRef(null);

    let nextUpdate = new Date();
    let updateClock = null;

    async function updateStats(e: MouseEvent<HTMLButtonElement>) {
        let i = 0;
        const target = e.target as HTMLButtonElement;
        setButtonDisabled(true);
        const interactiveText = setInterval(() => {
            setButtonText("Updating Statistics" + ".".repeat(++i))
            if (i >= 3) i = 0;
        }, 500);

        await fetch("/api/github/languages/update");
        nextUpdate.setTime(nextUpdate.getTime() + (3 * 60 * 60 * 1000));
        updateClock = setInterval(() => {
            const timeRemaining = ((nextUpdate.getTime() - Date.now()) / 1000);
            if (timeRemaining <= 0) {
                setButtonDisabled(false);
                clearInterval(updateClock);
            }

            else setLastUpdated(`Can Be Updated in: ${timeRemaining.toFixed(0)}s`);
        }, 1000);
        clearInterval(interactiveText);
        setButtonText("Updated Statistics");
    }

    function isLoading(): boolean {
        return false;
    }


    return isLoading() ? <h1> Loading... </h1> :

        <>
            <Head>
                <title>Github</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>

                <div className={styles.heading}>
                    <h1>Github Statistics - <a href="https://github.com/TimEnglart">TimEnglart</a></h1>
                    <div className={styles.updateStats}>
                        <button disabled={buttonDisabled} onClick={updateStats} className={styles.button}>
                            {buttonText}
                        </button>
                        {
                            buttonDisabled && <p> {lastUpdated} </p>
                        }
                    </div>

                </div>


                {
                    /*
                        Will Probably Need a Backend DB so that shit can be cached
                    */
                }

                {
                    // Have Update Button Available to send API requst to update data

                    /*
                        Modes:
                            Update
                            Update in x Seconds
                
                    */
                }
                <GithubLanguages sort="desc" sortMethod="Bytes" ref={githubLanguageComponent} />
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
                    // Recently Updated Repo's

                    /*
                        EXAMPLE LAYOUT
                
                        Repo Name                       Last Updated: xx/xx/xxxx
                        ⬤ Typescript, ⬤ SCSS           No. Commits: x
                                                ▽
                
                
                        Repo Name 2                     Last Updated: xx/xx/xxxx
                        ⬤ C#                            No. Commits: x
                                                ▽
                
                        
                        Repo Name is Anchored to Github Hosted Repo
                        Circle Colored to Github Programming Color
                        Down Arrow Can Expand to a Description?
                    */
                }
            </main>

        </>
}
