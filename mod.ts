let args = Deno.args.slice(1);
let cwd  = Deno.cwd();

import { index, init, help } from "./src/handler.ts";
import { yellow, red, green, gray } from "https://deno.land/std@0.84.0/fmt/colors.ts";
const commands: any = {
    "index": index,
    "init": init,
    "help": help
};

if (args.length == 0) {
    commands.index(args, cwd);
} else if (commands[args[0]] && args[0] !== "index") {
    commands[args[0]](args.slice(1), cwd);
} else {
    console.log(`
        ${yellow("Zam")} ${gray("-")} ${red("Command not found!")}
        ${green("zam")} ${gray("Start your app")}
        ${green("zam init")} ${red("<library>")} ${gray("Create a new project using specified Deno library")}
        ${green("zam help")} ${gray("Shows this message")}
    `);

    // ${green("zam clone")} ${red("<url>")} ${gray("Create a new app from a Zam project on the registry (https://zam.mod.land)")}
};