import { db } from "@/lib/db"
import { ContactsManagement } from "./contacts-management"

async function getContacts() {
  return db.contact.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdminContactsPage() {
  const contacts = await getContacts()
  return <ContactsManagement initialContacts={contacts} />
}
