import mysql, { type Pool, type RowDataPacket } from 'mysql2/promise';

declare global {
    var gnNationHubPool: Pool | undefined;
}

export type DbRow = RowDataPacket & Record<string, unknown>;

function readEnv(name: string, fallback = '') {
    return process.env[name] ?? fallback;
}

export function getPool() {
    if (!globalThis.gnNationHubPool) {
        globalThis.gnNationHubPool = mysql.createPool({
            host: readEnv('DB_HOST', '127.0.0.1'),
            port: Number(readEnv('DB_PORT', '3306')),
            database: readEnv('DB_DATABASE'),
            user: readEnv('DB_USERNAME'),
            password: readEnv('DB_PASSWORD'),
            waitForConnections: true,
            connectionLimit: 10,
            namedPlaceholders: true,
        });
    }

    return globalThis.gnNationHubPool;
}

export async function queryRows<T extends DbRow>(sql: string, params: Record<string, unknown> = {}) {
    const [rows] = await getPool().query<T[]>(sql, params as never);
    return rows;
}
