import { fileExists, zamfile } from "../../utils.ts";
import { yellow, red, green, gray } from "https://deno.land/std@0.84.0/fmt/colors.ts";

export const index = async (args: string[], location: string) => {
    if (!fileExists("./zam.json")) {
        console.log(yellow("⚠️  " + green("zam.json") + " not found! Creating one now."));
        Deno.writeTextFileSync("./zam.json", zamfile);
    };

    let config = JSON.parse(await Deno.readTextFile("./zam.json"));
    if (!config.main || !config.scripts || !config.scripts.start) throw(`Zam file does not contain value "${red(!config.main ? 'config.main' : !config.scripts ? 'config.scripts' : 'config.scripts.start')}"!`)
    if (!fileExists(config.main)) throw(config.main + " not found! Please edit your config.");

    const app = Deno.run({
        cmd: [... config.scripts.start.split(' '), config.main]
    });
    console.log(yellow("⚡ Starting " + green(config.name)));
    console.log(yellow("⚡ Ran command ") + green(config.scripts.start) + " " + red(config.main));
    
    await app.status();
};