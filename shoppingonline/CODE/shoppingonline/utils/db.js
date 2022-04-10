const sqlConfig = {
    user: 'sa',
    password: 'sa',
    database: 'DB_QUANLYDATHANG',
    server: 'localhost\\SQLEXPRESS',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000000
    },
    options: {
        trustServerCertificate: true
    }
};

export default sqlConfig;