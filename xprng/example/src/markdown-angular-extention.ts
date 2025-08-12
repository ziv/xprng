// import { Marked, MarkedExtension, MarkedToken, Token } from "marked";
// import { readFileSync } from "node:fs";
//
// function setToken(token: Token, text: string) {
//   Object.assign(token, {
//     type: "html",
//     block: true,
//     text,
//   });
// }
//
// export function toAngular(): MarkedExtension {
//   return {
//     async: false,
//     walkTokens(token: Token) {
//       if (token.type === "code" && token.lang === "ngx") {
//         // handle as Angular template for testing....
//         Object.assign(token, {
//           type: "html",
//           block: true,
//           text: `<xpe-code>${token.text}</xpe-code>`,
//         });
//       }
//       // else {
//       //   const tag: string = `xpe-${token.type}`;
//       //   const content = (token as { text: string }).text ?? token.raw;
//       //   Object.assign(token, {
//       //     type: "html",
//       //     block: true,
//       //     text: `<${tag}>${content}</${tag}>`,
//       //   })
//       // }
//     },
//   };
// }
//
// const marked = new Marked(toAngular());
// const content = readFileSync("./xprng/example/src/example.md", "utf-8");
// console.log(marked.parse(content));
