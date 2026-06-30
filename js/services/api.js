const API_URL = "https://webdec.requestcatcher.com";

export async function post(body) {

    const response = await fetch(API_URL, {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return true;
}