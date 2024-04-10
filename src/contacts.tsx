import { Elysia, error, t } from "elysia";
import { Base } from "./index";

export const contactRoutes = new Elysia({ prefix: `contacts` })
  .get(`/`, () => {
    return (
      <Base>
        <div class="flex flex-col space-y-10">
          <Contacts contacts={contacts}></Contacts>
          <Form data={{ contact: { name: "", email: "" }, error: "" }}></Form>
        </div>
      </Base>
    );
  })
  .post(
    `/`,
    ({ body, set }) => {
      if (emailExists(body)) {
        return (
          <Form data={{ contact: body, error: `Email already exists!` }}></Form>
        );
      }

      contacts.push(body);
      return (
        <>
          <Form data={{ contact: { name: ``, email: `` } }} />
          <div id="contacts" hx-swap-oob="beforeend">
            <Contact contact={body}></Contact>
          </div>
        </>
      );
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
      }),
      error({ body, set }) {
        set.status = `Accepted`;
        const message = `Please enter a valid name and email.`;
        return <Form data={{ contact: body, error: message }}></Form>;
      },
    }
  );

export type Contact = {
  name: string;
  email: string;
};

export const contacts: Contact[] = [
  { name: `Adam Bartonicek`, email: `foobar@gmail.com` },
];

function emailExists(contact: Contact) {
  for (const c of contacts) {
    if (c.email === contact.email) return true;
  }
  return false;
}

export function Form({ data }: { data: { contact: Contact; error?: string } }) {
  return (
    <form hx-post="/contacts" class="flex flex-col space-y-3">
      <span class="space-x-3">
        <label for="name">Name:</label>
        <input type="text" name="name" class="text-black">
          {data.contact.name}
        </input>
      </span>
      <span class="space-x-3">
        <label for="email">Email: </label>
        <input type="text" name="email" class="text-black">
          {data.contact.email}
        </input>
      </span>
      <button type="submit" class="bg-slate-700 hover:bg-slate-600 px-4 py-2">
        Add contact
      </button>
      <div class="flex text-red-500 justify-center">{data.error}</div>
    </form>
  );
}

export function Contacts({ contacts }: { contacts: Contact[] }) {
  return (
    <div id="contacts" class="flex flex-col justify-center items-center">
      <h1 class="text-3xl">Contacts</h1>
      {contacts.map((c) => (
        <Contact contact={c}></Contact>
      ))}
    </div>
  );
}

export function Contact({ contact }: { contact: Contact }) {
  return (
    <div>
      {contact.name} ({contact.email})
    </div>
  );
}
