import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { accessTokenState, memberIdState } from "atoms/atoms";
import { kakaoLogin } from "../../../api/member";
import { getToken } from "utils/FirebaseInit";

export default function KakaoAuth() {
  const [_, setAccessToken] = useRecoilState(accessTokenState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const router = useRouter();
  const { code } = router.query;

  const firebaseMessageToken = async () => {
    try {
      let token = await getToken();
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (!code) return;

    firebaseMessageToken()
      .then((currentToken) => {
        console.log("FCM token: ", currentToken);
        return currentToken;
      })
      .then((currentToken) => {
        kakaoLogin(code as string, currentToken).then((res) => {
          if (res.data.code === 1000) {
            const accessToken = res.headers.authorization;
            console.log(`accessToken : ${accessToken}`);

            setAccessToken(accessToken);
            setMemberId(res.data.data.memberId);

            router.push(
              res.data.data.surveyedYn ? "/calendar" : "/auth/survey"
            );
          }
        });
      })
      .catch((err) => console.error(err));
  }, [code, router, setAccessToken, setMemberId]);

  return null;
}
