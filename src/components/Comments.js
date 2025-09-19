"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Comments({ postId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching comments: ", error);
      setComments([]);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const response = await fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });

    if (response.ok) {
      setNewComment("");
      fetchComments();
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">댓글</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-2">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={comment.user_image}
                alt={comment.user_name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <strong>{comment.user_name}</strong>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      {session ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="댓글을 입력하세요..."
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            댓글 작성
          </button>
        </form>
      ) : (
        <p className="mt-6">댓글을 작성하려면 로그인하세요.</p>
      )}
    </div>
  );
}
