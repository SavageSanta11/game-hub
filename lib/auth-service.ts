// use the current user in clerk to find related information in the database

import { currentUser } from "@clerk/nextjs/server";

import {db} from "@/lib/db";

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username){
        throw new Error('User is unauthorized')
    }

    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id // usernames can change but ids cannot
        }
    });

    if (!user){
        throw new Error('User not found in database');
    }
    return user;
}