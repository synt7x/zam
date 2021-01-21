/*
    Oak Server
    Created with Zam

    Read the docs: 
    https://deno.land/x/oak/docs/index.md

    Support the creators:
    https://github.com/oakserver/
*/

import { Application } from "https://deno.land/x/oak/mod.ts";
import { zam } from "https://deno.land/x/zam/utils.ts";

const app = new Application();
const port: number = 3000;

app.use(async (context: any) => {
    const [req, res, path] = [context.request, context.response, context.request.url.pathname];

    switch (path) {
        case "/":
            res.headers.set("content-type", "text/html");
            res.body = await zam.file("./views/index.html");
            break;
        case "/Zam.svg":
            res.headers.set("content-type", "image/svg+xml");
            res.body = await zam.file("./assets/Zam.svg");
            break;
        case "/style.css":
            res.headers.set("content-type", "text/css");
            res.body = await zam.file("./assets/style.css");
            break;
    };
});

zam.listening(port || 3000)
await app.listen({port: port || 3000});