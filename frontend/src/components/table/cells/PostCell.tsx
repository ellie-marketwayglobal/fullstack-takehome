import { useState } from "react";
import type { GetUsersQuery } from "../../../__generated__/graphql";
type Post = GetUsersQuery["users"][0]["posts"][0];

interface PostCellProps {
  posts: Post[];
}

export const PostCell = ({ posts }: PostCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="underline cursor-pointer">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </span>
      {isHovered && posts.length > 0 && (
        <div className="absolute z-10 left-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="max-h-60 overflow-y-auto">
            {" "}
            {posts.map((post: Post) => (
              <div key={post.id} className="mb-2 text-sm">
                <h3 className="text-pacific font-bold"> {post.title} </h3>
                <p className="text-gray-600"> {post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
