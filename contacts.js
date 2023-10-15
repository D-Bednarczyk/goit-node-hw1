import fs from "fs/promises";
import path from "path";

import { nanoid } from "nanoid";

export const contactsPath = path.format({ dir: "db", base: "contacts.json" });

export async function listContacts(path) {
  const contacts = JSON.parse(await fs.readFile(path));
  contacts.map((contact) =>
    console.log(contact.name, " ", contact.phone, " ", contact.email)
  );
}

export async function getContactById(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const found = contacts.find((contact) => contact.id === contactId);
  console.log(found);
}

export async function removeContact(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  //await?
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id != contactId))
  );
}

export async function addContact(name, email, phone) {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  contacts.push({ id: nanoid(), name: name, email: email, phone: phone });
  //await ?
  fs.writeFile(contactsPath, JSON.stringify(contacts));
}
