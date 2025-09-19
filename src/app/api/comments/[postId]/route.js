import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET: 특정 게시물의 댓글 목록 가져오기
export async function GET(request, { params }) {
  const { postId } = await params;
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: 특정 게시물에 댓글 작성하기
export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { postId } = await params;
  const { content } = await request.json();
  const { user } = await session;

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        content,
        post_id: postId,
        user_name: user.name,
        user_image: user.image,
      },
    ])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0], { status: 201 });
}
