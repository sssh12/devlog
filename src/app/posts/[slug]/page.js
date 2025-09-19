import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";

// 빌드 시점에 모든 post의 slug를 가져와 미리 페이지를 생성
export async function generateStaticParams() {
  const { data: posts } = await supabase.from("posts").select("slug");
  // posts가 null일 경우를 대비
  if (!posts) return [];
  return posts.map(({ slug }) => ({ slug }));
}

// App Router에서는 페이지 컴포넌트가 props로 params 객체를 받음
// 이 params 객체 안에는 동적 경로의 값(여기서는 slug)이 들어있음
// 페이지 컴포넌트도 async로 변경
export default async function PostPage({ params }) {
  // params.slug를 이용해 특정 포스트 데이터 페칭
  // params.slug 값을 별도의 변수로 선언 (최신 Next.js 또는 Turbopack 동작 방식)
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single(); // 단일 객체 반환

  // post가 없을 경우를 대비해 404 페이지 보여주기
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        Posted on: {new Date(post.created_at).toLocaleDateString("ko-KR")}
      </p>
      <div className="prose">
        {/* Tailwind의 typography 플러그인 스타일 */}
        {post.content}
      </div>
      <Comments postId={post.id} />
    </div>
  );
}
