
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const tables = ['lowongan_kerja', 'posts', 'berita', 'articles', 'master_siswa', 'profiles'];
  
  console.log('--- DATABASE INSPECTION ---');
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);

    if (error) {
      console.log(`[x] Table "${table}": NOT FOUND or ERROR (${error.message})`);
    } else {
      console.log(`[v] Table "${table}": FOUND. Columns:`, Object.keys(data[0] || {}));
    }
  }
}

inspect();
