import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@/db/schema";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

async function findUserRoles(userId: string) {
    return [];
}

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    user: {
        modelName: "userTable"
    },
    account: {
        modelName: "accountTable"
    },
    session: {
        modelName: "sessionTable",
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // Cache duration in seconds
        },
    },
    verification: {
        modelName: "verificationTable"
    },
    plugins: [
        customSession(async ({ user, session }) => {
            const [dbUser] = await db.select({ 
                isAdmin: schema.userTable.isAdm
            })
            .from(schema.userTable)
            .where(eq(schema.userTable.id, user.id));
            const roles = await findUserRoles(session.userId);
            return {
                roles,
                user: {
                    ...user,
                    isAdmin: dbUser?.isAdmin || false,
                },
                session
            };
        }),
    ]
});