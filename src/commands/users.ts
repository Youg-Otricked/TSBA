import { setUser, readConfig } from "../config";
import { getUser, getUsers, createUser } from "../lib/db/queries/users"

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const userName = args[0];
  const existingUser = await getUser(userName);
  if (!existingUser) {
    throw new Error(`User ${userName} not found`);
  }

  setUser(existingUser.name);
  console.log("User switched successfully!");
}
export async function handlerUsers(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }
  const users = await getUsers();
  for (const user of users) {
    console.log(`* ${user.name}${readConfig().currentUserName == user.name ? " (current)" : ""}`)
  }
}

