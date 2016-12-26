import { RouteError } from './utils';

type Data = {name: string, value: any};
type RuleValidator = (data: Data) => any;
export type Rules = {[key: string]: RuleValidator};

export async function validate<Rules>(body: any, rules: Rules) {
    if (body === undefined || body === null || typeof body !== 'object') {
        throw new RouteError('Invalid body content.');
    }
    for (let property in rules) {
        if (rules.hasOwnProperty(property)) {
            const validator: RuleValidator = rules[ property ] as any;
            const errors: string[] = [];
            const data: Data = {
                name: property,
                value: body[property]
            };

            try {
                await Promise.resolve(validator(data));
            } catch (err) {
                if (err instanceof ValidatorError) {
                    errors.push(err.message);
                } else {
                    throw err;
                }
            }

            if (errors.length > 0) {
                throw new RouteError(errors.join(', '));
            }
        }
    }
}

export class ValidatorError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

type TypeType = (v1: RuleValidator, v2: RuleValidator) => RuleValidator;
export const Or: TypeType = (v1: RuleValidator, v2: RuleValidator) => async (data: Data) => {
    try {
        await Promise.resolve(v1(data));
    } catch (err) {
        if (!(err instanceof ValidatorError)) {
            throw err;
        }
        await Promise.resolve(v2(data));
    }
};
export const And: TypeType = (v1: RuleValidator, v2: RuleValidator) => async (data: Data) => {
    await Promise.resolve(v1(data));
    await Promise.resolve(v2(data));
};
export const IsString: RuleValidator = ({name, value}) => {
    if (typeof value !== 'string') {
        throw new ValidatorError(`${name} is not a string`);
    }
};
export const IsUndefined: RuleValidator = ({name, value}) => {
    if (value !== undefined) {
        throw new ValidatorError(`${name} is not undefined`);
    }
};
export const IsNull: RuleValidator = ({name, value}) => {
    if (value !== null) {
        throw new ValidatorError(`${name} is not null`);
    }
};
export const Between: (min: number, max: number) => RuleValidator = (min: number, max: number) => ({name, value}: Data) => {
    IsString({name, value});
    if (value.length < min || value.length > max) {
        throw new ValidatorError(`${name} should be between ${min}-${max} characters`);
    }
};
export const Matches: (regex: RegExp, error: string) => RuleValidator = (regex: RegExp, error: string) => ({name, value}: Data) => {
    if (!regex.test(String(value))) {
        throw new ValidatorError(error);
    }
};
export const StartsWith: (start: string, error: string) => RuleValidator = (start: string, error: string) => ({name, value}: Data) => {
    if (!String(value).startsWith(start)) {
        throw new ValidatorError(error);
    }
};
export const NotIn: (array: any[], error: string) => RuleValidator = (array: any[], error: string) => ({name, value}: Data) => {
    if (array.indexOf(value) > -1) {
        throw new ValidatorError(error);
    }
};
