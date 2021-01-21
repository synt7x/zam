import { yellow, red, green, gray } from "https://deno.land/std@0.84.0/fmt/colors.ts";

export const help = (args: string[], location: string) => {
    console.log(`
        ${yellow("Zam")} ${gray("-")} ${green("Help")}
        ${green("zam")} ${gray("Start your app")}
        ${green("zam init")} ${red("<library>")} ${gray("Create a new project using specified Deno library")}
        ${green("zam help")} ${gray("Shows this message")}
    `);

    // ${green("zam clone")} ${red("<url>")} ${gray("Create a new app from a Zam project on the registry (https://zam.mod.land)")}
};