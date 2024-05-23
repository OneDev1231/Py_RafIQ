import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { noAuthRequired } from "allConstants";
import { AuthOptional } from "allConstants/routes";
import moment from "moment";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // when user will share a chatbot with someone and won't require login to let them use it
    // anyone who'll open by that link will be logged in, means their token will be saved in localStorage
    // but it'll also store temporaryAccessToOptionalPage value, which is the timestamp at user logged in
    // if it's that user who got logged in by opening a shared bot
    // and is trying to access anything other than bot, it'll remove the token
    const isAccessOnlyToOptionalPage = localStorage.getItem(
      "temporaryAccessToOptionalPage"
    );
    // if trying to access AuthRequiredPage with AuthOptionalPage Token 
    if (isAccessOnlyToOptionalPage && !AuthOptional.includes(router.pathname)) {
      localStorage.removeItem("token");
      localStorage.removeItem("temporaryAccessToOptionalPage");
    }

    const token = localStorage.getItem("token");
    if (AuthOptional.includes(router.pathname)) {
      setLoading(false);
    } else if (token && noAuthRequired.includes(router.pathname)) {
      setLoading(true);
      router.push("/dashboard");
    } else if (!token && !noAuthRequired.includes(router.pathname)) {
      setLoading(true);
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [router.pathname]);

  return <div>{!loading ? children : null}</div>;
};
