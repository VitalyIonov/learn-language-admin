import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

import type { Route } from "./+types/login";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
}

export default function Login() {
  const [urlSearchParams] = useSearchParams();
  const accessToken = urlSearchParams.get("access_token");

  const handleGoogleLoginClick = () => {
    // const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";
    //
    // window.location.href = `${API_BASE}/auth/google/login`;
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`;
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);

      window.location.href = "/";
    }
  }, [accessToken]);

  // https://ui.shadcn.com/blocks/authentication
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Card className="m-auto flex w-sm flex-col gap-6">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={handleGoogleLoginClick}
                >
                  Login with Google
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
