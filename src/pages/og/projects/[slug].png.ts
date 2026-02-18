import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "@lib/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = (await getCollection("projects")).filter(
    (project) => !project.data.draft
  );
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { title: project.data.title, description: project.data.description },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    description: props.description,
  });

  return new Response(png as unknown as BodyInit, {
    headers: { "Content-Type": "image/png" },
  });
};
