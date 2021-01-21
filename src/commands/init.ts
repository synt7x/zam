import { fileExists, zamfile } from "../../utils.ts";
import { yellow, red, green, gray } from "https://deno.land/std@0.84.0/fmt/colors.ts";
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
    await Deno.copyFile(new URL(`../templates/${args[0]}/app.ts`, import.meta.url).pathname.substring(1), `${location}/app.ts`);

    if (!fileExists("./app.ts")) {
        console.log(`✔️  ${yellow("app.ts")} ${green("created!\n")}`);
    } else {
        console.log(`✔️  ${yellow("app.ts")} ${green("overwritten!\n")}`);
    };

    // Load assets
    console.log(`⚙️  ${yellow("Loading assets...")}`);

    await Deno.copyFile(new URL(`../templates/page/assets/style.css`, import.meta.url).pathname.substring(1), `${location}/assets/style.css`);
    await Deno.copyFile(new URL(`../templates/page/assets/Zam.svg`, import.meta.url).pathname.substring(1), `${location}/assets/Zam.svg`);

    console.log(`✔️  ${green("Assets loaded!\n")}`);

    // Load views
    console.log(`⚙️  ${yellow("Loading views...")}`);

    await Deno.copyFile(new URL(`../templates/page/views/index.html`, import.meta.url).pathname.substring(1), `${location}/views/index.html`);

    console.log(`✔️  ${green("Views loaded!\n")}`);
    console.log(`⚙️  ${yellow("Configuring Zam...")}`);

    index([], location);
};