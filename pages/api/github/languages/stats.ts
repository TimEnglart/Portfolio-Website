// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GithubUserLanguages from '@/api/models/GithubUserLanguages';
import type { NextApiRequest, NextApiResponse } from 'next'
import initConnection from '@/api/.'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const amount = Number(req.query?.amount ?? 3), start = Number(req.query?.start ?? 0);
    initConnection();
    const records = await GithubUserLanguages.find();//.sort({bytes: "desc"}).limit(amount + start);

    res.status(200).send(records);
}
