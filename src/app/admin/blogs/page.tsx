import { db } from "@/lib/db"
import { BlogManagement } from "./blog-management"

async function getBlogs() {
  return db.blog.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdminBlogsPage() {
  const blogs = await getBlogs()
  return <BlogManagement initialBlogs={blogs} />
}
