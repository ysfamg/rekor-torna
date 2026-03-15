import { db } from "@/lib/db"
import { ServiceManagement } from "./service-management"

async function getServices() {
  return db.service.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function AdminServicesPage() {
  const services = await getServices()
  
  return <ServiceManagement initialServices={services} />
}
