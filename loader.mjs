import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getSource(url, context, defaultGetSource) {
  if (new URL(url).origin == "https://stackoverflow.com") {
    const $ = cheerio.load(await fetch(url).then((res) => res.text()));
    const source = $(".js-post-body pre code", "#answers").first().text();
    return {
      source,
    };
  }
  return defaultGetSource(url, context, defaultGetSource);
}

export function resolve(specifier, context, defaultResolve) {
  if (new URL(specifier).origin == "https://stackoverflow.com") {
    return {
      url: specifier,
    };
  }

  return defaultResolve(specifier, context, defaultResolve);
}

export function getFormat(url, context, defaultGetFormat) {
  if (new URL(url).origin == "https://stackoverflow.com") {
    return {
      format: "module",
    };
  }
  return defaultGetFormat(url, context, defaultGetFormat);
}
