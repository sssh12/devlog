"use client"; // 이 컴포넌트와 그 자식들이 클라이언트 컴포넌트임을 명시

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
