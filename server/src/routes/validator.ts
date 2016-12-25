import { RouteError } from './utils';

type ValidatorResponse = Promise<boolean> | boolean;
type RuleValidator = (value: any) => ValidatorResponse;
export type Rules = {[key: string]: RuleValidator};

export async function validate<Rules>(body: any, rules: Rules) {
    if (body === undefined || body === null || typeof body !== 'object') {
        throw new RouteError('Invalid body content.');
    }
    for (let property in rules) {
        if (rules.hasOwnProperty(property)) {
            const validator: RuleValidator = rules[ property ] as any;

            const good: boolean = !!(await Promise.resolve(validator(body[ property ])));
            if (!good) {
                throw new RouteError(`Invalid value for ${property}.`);
            }
        }
    }
}

type TypeType = (v1: RuleValidator, v2: RuleValidator) => RuleValidator;
export const Or: TypeType = (v1: RuleValidator, v2: RuleValidator) => async(val) => {
    const good: boolean = await Promise.resolve(v1(val));
    if (good) {
        return true;
    }
    return await Promise.resolve(v2(val));
};
export const And: TypeType = (v1: RuleValidator, v2: RuleValidator) => async(val) => {
    return await Promise.resolve(v1(val)) && await Promise.resolve(v2(val));
};
export const IsString: RuleValidator = value => typeof value === 'string';
export const IsUndefined: RuleValidator = value => value === undefined;
export const IsNull: RuleValidator = value => value === null;
