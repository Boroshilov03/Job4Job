
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(
    'https://sqdhnzgfqoxfdvyybbmi.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZGhuemdmcW94ZmR2eXliYm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTk5NTQsImV4cCI6MjAxMjg5NTk1NH0.a7RwZx7eRzFOAwzYR4fUwOqC4pvmdQ_YNtSIwqkkoH0'
);

export { supabase };
