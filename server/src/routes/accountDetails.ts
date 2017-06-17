import { Router, Request, Response } from 'express';
import { wrap } from './utils';
import { IsString, Rules, validate, Or, And, Between, ValidatorError, Length } from './validator';
import CountryList = require('country-list');

const debug = require('debug')('Devathon:AccountDetails');
const router: Router = Router();
const countries = new CountryList();

const ShippingRules: Rules = {
    fullname: And(IsString, Between(3, 100)),
    address1: And(IsString, Between(3, 100)),
    address2: And(IsString, Or(Length(0), Between(3, 100))),
    city: And(IsString, Between(3, 100)),
    state: And(IsString, Between(3, 100)),
    zip: And(IsString, Between(3, 12)),
    country: And(IsString, function ({ value }) {
        if (countries.getCode(value) === undefined) {
            throw new ValidatorError('Invalid Country Name');
        }
    }),
};
router.post('/shipping', wrap(async(req: Request, res: Response) => {
    await validate(req.body, ShippingRules);

    if (req.header('accept').indexOf('text/html') > -1) { // browser who wants HTML
        res.redirect(`/user/yourid`);
    } else {
        res.json({ success: true });
    }
}));

export default router;