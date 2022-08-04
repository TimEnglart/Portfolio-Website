import type { NextApiRequest, NextApiResponse } from 'next'

import IGithubRepo from '@/api/models/GithubRepo'
import IGithubLanguageSchema, { GithubLanguageData } from '@/api/models/GithubUserLanguages'
import { MongoDBHandler } from '@/api/.';
export interface Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Permissions {
    admin: boolean;
    push: boolean;
    pull: boolean;
}

export interface License {
    key: string;
    name: string;
    url: string;
    spdx_id: string;
    node_id: string;
    html_url: string;
}

export interface IGuthubUserRepo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: Owner;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url: string;
    mirror_url: string;
    hooks_url: string;
    svn_url: string;
    homepage: string;
    language?: any;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    is_template: boolean;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    pushed_at: Date;
    created_at: Date;
    updated_at: Date;
    permissions: Permissions;
    allow_rebase_merge: boolean;
    template_repository?: any;
    temp_clone_token: string;
    allow_squash_merge: boolean;
    delete_branch_on_merge: boolean;
    allow_merge_commit: boolean;
    subscribers_count: number;
    network_count: number;
    license: License;
    forks: number;
    open_issues: number;
    watchers: number;
}

interface IRequestOptions {
    per_page: number;
    page: number;
}

interface IGithubLanguages {
    [language: string]: number;
}

interface IRepoLanguageInfo {
    [language: string]: {
        bytes: number;
    }
}

interface ResponseRepo {
    name: string;
    id: number,
    updated: Date;
    private: boolean;
    url: string;
    bytes: number;
    langauges: IRepoLanguageInfo;
}

interface LanguageTotals {
    [language: string]: GithubLanguageData;
}
interface MyResponse {
    repos: ResponseRepo[];
    totals: LanguageTotals;
}

let response: MyResponse = {
    repos: [],
    totals: {}
}


const {
    gh_access_token,
} = process.env;

function githubfetch(url: string): Promise<Response> {
    console.log(gh_access_token);
    return fetch(url, {
        headers: {
            "Authorization": `token ${gh_access_token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });
}

type placeholder = any;

export default async (req: NextApiRequest, res: NextApiResponse<placeholder>) => {
    /*if (!cache.length) await update(); // Wait for Update
    else*/
    const test = await update(); // Serve Old Data lmao
    //console.log(JSON.stringify(test));
    res.status(200).send(test);
}




const lastUpdate = new Date();

function hasEnoughTimePast(msRequired = 300000): boolean {
    // if lastUpate is null get it
    return ((new Date()).getTime() - lastUpdate.getTime()) > msRequired;
}


async function update(): Promise<MyResponse> {
    //const requestOptions: IRequestOptions = JSON.parse(req.body || {});
    const requestOptions: any = {};
    const actualRequestOptions: IRequestOptions = {
        per_page: requestOptions?.per_page ?? 20,
        page: requestOptions?.page ?? 1
    };
    let currentPage = actualRequestOptions.page;
    let nextPageRequired = false;
    const languageTotalBytes: LanguageTotals = {};
    const returnRepos: ResponseRepo[] = [];

    do {

        const repoResponse = await githubfetch(`https://api.github.com/user/repos?visibility=all&sort=updated&per_page=${actualRequestOptions.per_page}&page=${currentPage++}`);
        const repos: IGuthubUserRepo[] = await repoResponse.json();
        nextPageRequired = repos.length === actualRequestOptions.per_page;

        for (const repo of repos) { // For Every Repository on User Account
            const repoLanguagesResponse = await githubfetch(repo.languages_url);
            const repoLanguages: IGithubLanguages = await repoLanguagesResponse.json();
            let totalBytes = 0;


            for (const [language, bytes] of Object.entries(repoLanguages)) { // For Every Language in Repository
                if (!languageTotalBytes[language])
                    languageTotalBytes[language] = {
                        bytes: 0,
                        percent: 0,
                        projects: {
                            private: 0,
                            public: 0,
                        }
                    };
                languageTotalBytes[language].bytes += bytes;

                if (repo.private)
                    languageTotalBytes[language].projects.private++;
                else languageTotalBytes[language].projects.public++;

                totalBytes += bytes;
            }

            returnRepos.push({
                name: repo.name,
                id: repo.id,
                updated: repo.updated_at,
                private: repo.private,
                url: repo.html_url,
                bytes: totalBytes,
                langauges: Object.entries(repoLanguages).reduce((p: IRepoLanguageInfo, [k, v]) => {
                    p[k] = { bytes: v };
                    return p;
                }, {}),
            });
        }
    } while (nextPageRequired);

    const totalBytes = Object.values(languageTotalBytes).reduce((p, c) => p + c.bytes, 0);

    for (const language of Object.keys(languageTotalBytes)) {
        languageTotalBytes[language].percent = languageTotalBytes[language].bytes / totalBytes * 100;
        const collection = await MongoDBHandler.instance.collection<IGithubLanguageSchema>(MongoDBHandler.Collections.GithubLanguageStatistics);
        await collection.findOneAndUpdate({ _id: language }, { $set: { ...languageTotalBytes[language] } }, { upsert: true });
    }
    response = {
        repos: returnRepos,
        totals: languageTotalBytes
    }
    console.log(response);
    return response;
}
