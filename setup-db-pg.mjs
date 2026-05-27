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

async function setupDatabase() {
  try {
    console.log('🔧 Conectando ao Supabase...\n');
    await client.connect();
    console.log('✅ Conectado!\n');

    console.log('📁 Lendo arquivo SQL...\n');
    const sqlPath = path.join(__dirname, 'supabase-setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('⚙️  Executando schema...\n');
    await client.query(sql);

    console.log('✅ Schema executado com sucesso!\n');
    console.log('📊 Todas as tabelas, políticas e índices foram criados.\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Erro de conexão. Verifique:');
      console.log('- Host está correto: jmoglxollutnthjzofjq.supabase.co');
      console.log('- Senha está correta');
      console.log('- Projeto não está pausado\n');
    }
  } finally {
    await client.end();
  }
}

setupDatabase();
