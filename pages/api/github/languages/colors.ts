// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GithubUserLanguages from '@/api/models/GithubUserLanguages';
import type { NextApiRequest, NextApiResponse } from 'next'
import YAML from 'yaml'

export interface IGithubLanguage {
    [language: string]: {
        type: string;
        color: string;
        extensions: string[];
        tm_scope: string;
        ace_mode: string;
        language_id: number;
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<IGithubLanguage>) => {
    const url = "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";
    const languagesResponse = await fetch(url);
    const languagesYAML = await languagesResponse.text();
    const response = YAML.parseDocument(languagesYAML).toJSON();
    res.status(200).send(response);
}
