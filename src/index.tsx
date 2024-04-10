import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { Contact, Contacts, Form, contactRoutes, contacts } from "./contacts";

const app = new Elysia()
  .use(html())
  .use(contactRoutes)
  .get(`/`, ({ set }) => {
    set.redirect = `/contacts`;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export function Base({ children }: any) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.11"
          integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0"
          crossorigin="anonymous"
        ></script>
        <script src="https://unpkg.com/htmx.org@1.9.11/dist/ext/response-targets.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="flex w-full h-screen justify-center items-center bg-slate-500 text-white">
        {children}
      </body>
    </html>
  );
}
