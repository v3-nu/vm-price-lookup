// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://meewovnxjilebypkwoiv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZXdvdm54amlsZWJ5cGt3b2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxOTkxMDksImV4cCI6MjA1Nzc3NTEwOX0.M4VpW3rahtdhFs9pPBpYlEwVnCOZHDx_EwWaK2H0fKQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);