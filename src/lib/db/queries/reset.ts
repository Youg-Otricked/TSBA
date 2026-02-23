import { db } from "..";
import { resetUsers } from "./users";

export async function reset() {
    await resetUsers();
}