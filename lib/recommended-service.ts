import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { resolve } from "path";

export const getRecommended = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000)); // makes it load for 5s
  const users = await db.user.findMany({
    orderBy: {
        createdAt: "desc"
    }
  });

  return users;
};