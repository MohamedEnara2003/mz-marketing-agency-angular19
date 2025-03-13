import {GoTrueClient} from '@supabase/gotrue-js'

export const environment = {
    production: false,
    supabaseUrl : 'https://kzzljjlggloknteiirlr.supabase.co' ,
    supabaseKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6emxqamxnZ2xva250ZWlpcmxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTAyNTk2OCwiZXhwIjoyMDU2NjAxOTY4fQ.lFesJYPys2NXfkVGV-uMBaV1JY5mxK7c7ARdzrzG1Wc' ,
}

export  const authClient : GoTrueClient = new GoTrueClient({
    url: `${environment.supabaseUrl}/auth/v1`,
    headers: {
    apiKey: environment.supabaseKey,
    }
});

