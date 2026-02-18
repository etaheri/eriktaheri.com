import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@consts";

export async function GET(context: { site: string }) {
  const writing = (await getCollection("writing"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const projects = (await getCollection("projects"))
    .filter((project) => !project.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = [
    ...writing.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.id}`,
    })),
    ...projects.map((project) => ({
      title: project.data.title,
      description: project.data.description,
      pubDate: project.data.date,
      link: `/projects/${project.id}`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.NAME,
    description: SITE.DESCRIPTION,
    site: context.site,
    items,
  });
}
