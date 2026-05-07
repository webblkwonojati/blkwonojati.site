
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for inspection if available

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const { data, error } = await supabase
    .from('lowongan_kerja')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Inspection Error:', error);
  } else {
    console.log('Columns found:', Object.keys(data[0] || {}));
  }
}

inspect();
