import { api } from "~/utils/api";
import HaikuCard from "./HaikuCard";
import { useSession } from "next-auth/react";

export default function HaikuFeed() {
  const { data: sessionData } = useSession();
  const utils = api.useUtils();
  const haikus = api.haiku.getLatest.useQuery({ limit: 10 });
  const likeHaiku = api.haiku.like.useMutation().mutateAsync;
  const unlikeHaiku = api.haiku.unlike.useMutation().mutateAsync;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {haikus.data?.map((haiku) => (
        <HaikuCard
          author={haiku.author.name ?? "Unknown"}
          key={haiku.id}
          content={haiku.content}
          likes={haiku.haikuLikes.length}
          isLikedByUser={haiku.haikuLikes.some(
            (like) => like.userId === sessionData?.user.id,
          )}
          onLike={() =>
            likeHaiku(
              { haikuId: haiku.id },
              { onSuccess: () => void utils.haiku.getLatest.invalidate() },
            )
          }
          onUnlike={() =>
            unlikeHaiku(
              { haikuId: haiku.id },
              { onSuccess: () => void utils.haiku.getLatest.invalidate() },
            )
          }
        />
      ))}
    </div>
  );
};