import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user){
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-y-4">
        <p>User: {params.username}</p>
        <p>User ID: {user.id}</p>
        <p> Is following: {`${isFollowing}`}</p>
        <p> Is blocked by this user: {`${isBlocked}`}</p>
    </div>
  )
};

export default UserPage;