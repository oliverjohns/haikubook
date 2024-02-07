import { type SVGProps } from "react";

const Heart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill={"none"}
    stroke={"currentColor"}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
export default function HaikuCard({
  content,
  author,
  likes,
  isLikedByUser,
  onLike,
  onUnlike,
}: {
  content: string;
  author: string;
  likes: number;
  isLikedByUser: boolean;
  onLike: () => void;
  onUnlike: () => void;
}) {
  return (
    <div className="min-w-[200px] max-w-sm rounded-2xl border border-gray-400 bg-white/10 shadow-md backdrop-blur-sm dark:bg-gray-900/10">
      <div className="p-5">
        <p className="mb-3 whitespace-pre-line font-normal text-center italic text-gray-200">
          {content}
        </p>
        <div className="flex flex-row justify-between text-xs text-white/50">
          <span>{likes} likes</span>
          <span>- {author}</span>
          <Heart
            fill={isLikedByUser ? "#80e8ff" : "none"}
            onClick={isLikedByUser ? onUnlike : onLike}
          />
        </div>
      </div>
    </div>
  );
};
