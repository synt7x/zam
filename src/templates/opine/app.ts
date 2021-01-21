/*
    Opine Server
    Created with Zam

    Read the docs: 
    https://github.com/asos-craigmorten/opine/blob/main/.github/API/api.md

    Support the creator:
    https://github.com/cmorten
    https://github.com/asos-craigmorten
*/

import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
import { zam } from "https://deno.land/x/zam/utils.ts";

const app = opine();
const port: number = 3000;

app.use(serveStatic("assets"));

app.get("/", (req: any, res: any) => {
    res.sendFile("views/index.html", zam.opine);
});
  
app.listen(port || 3000, () => {
    zam.listening(port || 3000);
});