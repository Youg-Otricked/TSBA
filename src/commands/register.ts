import { setUser } from "../config";
import { getUser, createUser } from "../lib/db/queries/users"

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const userName = args[0];
  if (await getUser(userName)) {
    throw new Error(`user ${userName} already exists`);
  } else {
    await createUser(userName);
    await setUser(userName);
    console.log(`user ${userName} was successfully registered.`);
  }
}
