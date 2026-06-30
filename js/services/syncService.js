import { post, isConnected } from "./api.js";

export async function syncAccount(account) {

    if (!(await isConnected())) {
        return false;
    }

    try {

        await post("/accounts", account);

        return true;

    } catch {

        return false;

    }

}