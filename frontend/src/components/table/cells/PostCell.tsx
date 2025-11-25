import { useState } from "react";
import type { GetUsersQuery } from "../../../__generated__/graphql";
type Post = GetUsersQuery["users"][0]["posts"][0];

interface PostCellProps {
  posts: Post[];
}

export const PostCell = ({ posts }: PostCellProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative inline-block">
        <span
          className="underline cursor-pointer text-pacific"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
        {isOpen && posts.length > 0 && (
          <>
            <div
              className="fixed md:absolute z-50 left-4 right-4 right-0 left-auto mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-3 md:p-4 max-h-[60vh] md:max-h-96 overflow-y-auto"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {posts.map((post: Post) => (
                <div
                  key={post.id}
                  className="mb-3 pb-3 border-b border-gray-100 last:border-b-0"
                >
                  <h3 className="text-pacific font-bold mb-1">{post.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
