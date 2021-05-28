// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IGithubLanguageSchema from '@/api/models/GithubUserLanguages';
import { MongoDBHandler } from '@/api/.';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const amount = Number(req.query?.amount ?? 3), start = Number(req.query?.start ?? 0);
    const collection = await MongoDBHandler.instance.collection<IGithubLanguageSchema>(MongoDBHandler.Collections.GithubLanguageStatistics);

    const records = collection.find();//.sort({bytes: "desc"}).limit(amount + start);
    const ret = await records.toArray();
    res.status(200).send(ret);
}
