export default {
    port: 3000,
    host: '127.0.0.1',
    github: {
        clientId: '',
        clientSecret: ''
    },
    mysql: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'devathon'
    },
    sessions: {
        secret: 'abcdefghijklmnopqrstuvwxyzDEVATHON-SUPER-SECRET-SECRET-PLEASE-CHANGE'
    },
    hashesSalt: 'thiswillbebrokeneventually'
};