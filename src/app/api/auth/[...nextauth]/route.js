import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// 1. 인증 설정 객체를 별도의 상수로 만들어 export
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// 2. export한 authOptions를 NextAuth 함수에 전달
const handler = NextAuth(authOptions);

// App Router에서는 GET, POST 요청을 export 해야함
export { handler as GET, handler as POST };
