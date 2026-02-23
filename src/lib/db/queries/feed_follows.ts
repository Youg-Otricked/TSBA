import { eq, and } from "drizzle-orm";
import { db } from "..";
import { feeds, feed_follows, users } from "../schema";
export async function createFeedFollow(user_id: string, feed_id: string) {
  const [newFeedFollow] = await db
    .insert(feed_follows)
    .values({ user_id: user_id, feed_id: feed_id })
    .returning();

  const [result] = await db
    .select({
      id: feed_follows.id,
      createdAt: feed_follows.createdAt,
      updatedAt: feed_follows.updatedAt,
      user_id: feed_follows.user_id,
      feed_id: feed_follows.feed_id,
      feedName: feeds.name,
      userName: users.name,
    })
    .from(feed_follows)
    .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
    .innerJoin(users, eq(feed_follows.user_id, users.id))
    .where(
      and(
        eq(feed_follows.id, newFeedFollow.id),
        eq(users.id, newFeedFollow.user_id),
      ),
    );

  return result;
}

export async function getFeedFollowsForUser(user_id: string) {
  const result = await db
    .select({
      id: feed_follows.id,
      createdAt: feed_follows.createdAt,
      updatedAT: feed_follows.updatedAt,
      user_id: feed_follows.user_id,
      feed_id: feed_follows.feed_id,
      feedname: feeds.name,
    })
    .from(feed_follows)
    .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
    .where(eq(feed_follows.user_id, user_id));

  return result;
}
export async function unfollowFeedForUser(feedId: string, userId: string) {
  const [result] = await db
    .delete(feed_follows)
    .where(and(eq(feed_follows.feed_id, feedId), eq(feed_follows.user_id, userId)))
    .returning();

  return result;
}