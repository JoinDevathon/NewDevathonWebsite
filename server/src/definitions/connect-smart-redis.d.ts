declare module "connect-smart-redis" {
    import * as ExpressSession from 'express-session';
    import { RedisClient } from 'redis';
    import session = require('express-session');

    function create(session: typeof ExpressSession): typeof create.SmartRedis;

    namespace create {
        interface Options {
            client: RedisClient;
            ttl?: number;
            prefix?: string;
            lockExpiry?: number;
            retryTime?: number;
            deleteExpiry?: number;
        }

        export class SmartRedis extends session.Store {
            constructor(options: Options);
        }
    }

    export = create;
}