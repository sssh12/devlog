import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// 1. 페이지를 주기적으로 재검증하도록 설정 (ISR)
// 이 페이지는 10초마다 캐시가 갱신됨
export const revalidate = 10;

// 2. page 컴포넌트 함수를 async로 변경
export default async function HomePage() {
  // 3. 컴포넌트 안에서 직접 데이터 페칭
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      <ul>
        {(posts || []).map((post) => (
          <li key={post.id} className="mb-2">
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
