"use client"; // 상호작용(클릭, 상태)이 있으므로 클라이언트 컴포넌트로 선언

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>{session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      GitHub으로 로그인
    </button>
  );
}
