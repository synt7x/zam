import { fileExists, zamfile } from "../../utils.ts";
import { yellow, red, green, gray } from "https://deno.land/std@0.84.0/fmt/colors.ts";

import { cache } from "https://deno.land/x/cache/mod.ts";
import { index } from "./index.ts";

export const init = async (args: string[], location: string) => {
    const templates = ["abc", "oak", "opine"]
    if (args[0] == "page" || !templates.find(name => name == args[0])) return console.log(`
    ${yellow("Zam")} ${gray("-")} ${red("Selected module does not have a valid template!")}
    ${gray("List of templates:")}
        ${gray("-")} ${yellow("zam init")} ${green("abc")}
        ${gray("-")} ${yellow("zam init")} ${green("oak")}
        ${gray("-")} ${yellow("zam init")} ${green("opine")}
    `);

    // Create directories
    console.log(`⚙️  ${yellow("Creating directories...")}`);

    try {
        await Deno.mkdir("./views");
        await Deno.mkdir("./assets");

        console.log(`✔️  ${green("Done!")}`);
    } catch(err) {
        if (err.name == "AlreadyExists") {
            console.log(`✔️  ${green("Directories already exist!")}`);
        } else {
            console.log(`❌  ${red("Failed to create directory!")}`);
        }
    }

    // Create Zam file
    if (!fileExists("./zam.json")) {
        Deno.writeTextFileSync("./zam.json", zamfile);
        console.log(`✔️  ${yellow("zam.json")} ${green("created!")}`);
    } else {
        console.log(`✔️  ${yellow("zam.json")} ${green("already exists!")}`);
    };

    // Load app
    let appCache = await cache(`https://deno.land/x/zam/src/templates/${args[0]}/app.ts`)
    let app = appCache.path;

    await Deno.copyFile(app, `${location}/app.ts`);

    if (!fileExists("./app.ts")) {
        console.log(`✔️  ${yellow("app.ts")} ${green("created!\n")}`);
    } else {
        console.log(`✔️  ${yellow("app.ts")} ${green("overwritten!\n")}`);
    };

    // Load assets
    console.log(`⚙️  ${yellow("Loading assets...")}`);

    let zamSvgCache = await cache(`https://deno.land/x/zam/src/templates/page/assets/Zam.svg`)
    let zamSvg = zamSvgCache.path;

    let stylesheetCache = await cache(`https://deno.land/x/zam/src/templates/page/assets/style.css`)
    let stylesheet = stylesheetCache.path;

    await Deno.copyFile(stylesheet, `${location}/assets/style.css`);
    await Deno.copyFile(zamSvg, `${location}/assets/Zam.svg`);

    console.log(`✔️  ${green("Assets loaded!\n")}`);

    // Load views
    console.log(`⚙️  ${yellow("Loading views...")}`);

    let htmlCache = await cache(`https://deno.land/x/zam/src/templates/page/views/index.html`)
    let html = htmlCache.path;

    await Deno.copyFile(html, `${location}/views/index.html`);

    console.log(`✔️  ${green("Views loaded!\n")}`);
    console.log(`⚙️  ${yellow("Configuring Zam...")}`);

    index([], location);
};