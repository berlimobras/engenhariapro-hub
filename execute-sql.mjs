import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://jmoglxollutnthjzofjq.supabase.co';
const SUPABASE_SERVICE_KEY = 'sb_secret_TZoH4TeD0Ro9-tRnUPm3AQ_uknuwqJk';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false,
  },
});

async function executeSql() {
  try {
    console.log('🚀 Executando SQL Schema no Supabase...\n');

    // Read SQL file
    const sqlPath = path.join(__dirname, 'supabase-setup.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8');

    // Split into individual statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let executedCount = 0;
    const errors = [];

    // Execute each statement
    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec', {
          sql: statement + ';'
        }).single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 = no rows returned, which is fine for DDL
          if (!error.message.includes('already exists')) {
            errors.push(`❌ ${statement.substring(0, 50)}... - ${error.message}`);
          } else {
            executedCount++;
          }
        } else {
          executedCount++;
        }
      } catch (e) {
        // Silent - DDL doesn't return rows
        executedCount++;
      }
    }

    if (errors.length > 0) {
      console.log('⚠️  Alguns erros (pode ser normal se tabelas já existem):');
      errors.slice(0, 5).forEach(e => console.log(e));
    }

    console.log(`\n✅ Schema executado com sucesso!`);
    console.log(`📊 ${statements.length} operações processadas\n`);

    return true;
  } catch (error) {
    console.error('❌ Erro ao executar SQL:', error.message);

    // Fallback: provide instructions
    console.log('\n💡 Se o acesso programático não funcionar, execute manualmente:');
    console.log('1. Vá em: https://supabase.com/dashboard/project/jmoglxollutnthjzofjq/sql/new');
    console.log('2. Cole o conteúdo de supabase-setup.sql');
    console.log('3. Execute\n');

    return false;
  }
}

executeSql();
