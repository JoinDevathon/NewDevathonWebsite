import fetch from 'node-fetch';
import { stringify } from 'querystring';
import config from '../../config/config';

export interface GithubObject {
    message?: string;
}

export interface GithubAccessToken extends GithubObject {
    access_token: string;
}

export interface GithubUser extends GithubObject {
    login: string;
    id: number;
    email: string | null;
}

const headers: any = {
    'Accept': 'application/json',
    'User-Agent': 'DevathonWebsite'
};

export async function getToken(code: string): Promise<GithubAccessToken> {
    return await (await fetch(`https://github.com/login/oauth/access_token`, {
        method: 'POST',
        headers,
        body: stringify({
            client_id: config.github.clientId,
            client_secret: config.github.clientSecret,
            code
        })
    })).json();
}

export async function getUserFromAccess(accessToken: string): Promise<GithubUser> {
    return await (await fetch(`https://api.github.com/user?access_token=${accessToken}`, {
        method: 'GET',
        headers
    })).json();
}

export async function getUserFromId(id: number): Promise<GithubUser> {
    return await (await fetch(`https://api.github.com/user/${id}`, {
        method: 'GET',
        headers
    }));
}
