import { supabase } from './supabaseClient'

// TEMPORARY security checks, run as an anonymous visitor.
// Delete this file and its import in main.tsx after step 3.3.
async function run() {
  const read = await supabase.from('categories').select('*')
  console.log('1. read categories (expect NO error and an empty list):', read)

  const write = await supabase.from('categories').insert({ name: 'Hack', slug: 'hack' })
  console.log('2. insert category (expect a permission error):', write.error?.message)

  const feedbackRead = await supabase.from('feedback').select('*')
  console.log('3. read feedback (expect a permission error):', feedbackRead.error?.message)

  const feedbackBad = await supabase
    .from('feedback')
    .insert({ name: 'Test', email: 'not-an-email', subject: 'Hi', message: 'short' })
  console.log('4. invalid feedback (expect a constraint error):', feedbackBad.error?.message)

  const profiles = await supabase.from('profiles').select('*')
  console.log('5. read profiles (expect a permission error):', profiles.error?.message)
}

void run()