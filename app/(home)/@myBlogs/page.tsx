import React from "react";

import Blogs from "../_components/module/blogs";

import { getAllBlogs } from "@/service/blogService/blogService";

export default async function BlogsPage() {
  const data = await getAllBlogs();
  const blogs = data?.data;

  return <Blogs blogs={blogs} />;
}
