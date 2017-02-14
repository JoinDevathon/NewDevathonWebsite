import { client } from './connect';
import { getContestScores as getDBScores } from '../data/contests';
import { getUserName } from './user';

export function getContestScores(contest: number): Promise<any> {
    return new Promise((resolve, reject) => {
        client.get(`dn:cs:${contest}`, (error: Error, value: string | null) => {
            if (error) {
                return reject(error);
            }
            if (value) {
                return resolve(JSON.parse(value));
            }
            getDBScores(contest)
                .then(scores => Promise.all(scores.map(async score => {
                    score.name = await getUserName(score.github_id);
                    score.score = +score.score.toFixed(1);
                    return score;
                })))
                .then(scores => {
                    client.set(`dn:cs:${contest}`, JSON.stringify(scores), 'EX', 24 * 60 * 60, (err: Error) => {
                        if (err) {
                            return reject(error);
                        }
                        resolve(scores);
                    })
                })
                .catch(reject);
        });
    });
}