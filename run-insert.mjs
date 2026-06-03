import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Client } = pg;

const client = new Client({
  host: 'jmoglxollutnthjzofjq.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'TZoH4TeD0Ro9-tRnUPm3AQ_uknuwqJk',
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runInsert() {
  try {
    console.log('🔧 Conectando ao Supabase...');
    await client.connect();
    
    console.log('📁 Lendo insert-data-sql.sql...');
    const sqlPath = path.join(__dirname, 'insert-data-sql.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('⚙️ Executando...');
    await client.query(sql);

    console.log('✅ Dados inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await client.end();
  }
}

runInsert();
