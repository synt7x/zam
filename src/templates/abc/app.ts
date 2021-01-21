/*
    ABC Server
    Created with Zam

    Read the docs: 
    https://deno.land/x/abc/docs/table_of_contents.md

    Support the creator:
    https://github.com/zhmushan
*/

import { Application } from "https://deno.land/x/abc/mod.ts";
import { zam } from "https://deno.land/x/zam/utils.ts";

const app = new Application();
const port: number = 3000;

app
    .get("/", async () => {
        return await zam.file("views/index.html");
    })
    .static("/", "./assets")
    .start({ port: port || 3000 });

zam.listening(port || 3000)