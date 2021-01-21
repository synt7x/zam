export const zam = {
  listening: (port: number) => {
      console.log(`⚡ Your app is listening on port ${port}!`);
  },

  file: async (path: string) => {
    const Decoder = new TextDecoder("utf-8");
    const File = Deno.readFileSync(path);

    return await Decoder.decode(File);
  },

  // Code simplification
  opine: {"root": "."},

  oak: (context: any) => {
    return context.request, context.response, context.request.url.pathname
  },
};

export const zamfile = `{
  "name": "Zam App",
  "version": "1.0.0",
  "main": "app.ts",

  "scripts": {
      "start": "deno run -A"
  }
}`

export function fileExists(filePath: string): boolean {
    try {
      Deno.lstatSync(filePath);
      return true;
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        return false;
      }
      throw err;
    }
  }