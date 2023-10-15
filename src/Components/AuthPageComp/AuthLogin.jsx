
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {supabase} from "../../Data/SupabaseData.jsx";

function AuthLogin() {

    const navigate = useNavigate();

    supabase.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_IN") {
            navigate("/jobs");
        }
    });

    return (
        <div className="p-4 h-[calc(100vh-72px)] flex items-center justify-center ">
            <div className="w-full md:w-2/3 lg:w-1/3">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={["google"]}
                />
            </div>
        </div>
    );
}

export default AuthLogin;