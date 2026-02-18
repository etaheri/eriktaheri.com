import { getCollection } from "astro:content";
import { SITE } from "@consts";

export async function GET() {
  const writing = (await getCollection("writing"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const projects = (await getCollection("projects"))
    .filter((project) => !project.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const work = (await getCollection("work")).sort(
    (a, b) => b.data.dateStart.valueOf() - a.data.dateStart.valueOf()
  );

  const lines: string[] = [
    `# ${SITE.NAME}`,
    "",
    `> ${SITE.DESCRIPTION}`,
    "",
    "Erik is a software engineer and technology leader with over a decade of experience building products across the stack, from interactive WebGL experiences at creative agencies to platform engineering at growth-stage startups.",
    "",
    "## Links",
    "",
    `- [Home](https://eriktaheri.com)`,
    `- [Writing](https://eriktaheri.com/writing)`,
    `- [Work](https://eriktaheri.com/work)`,
    `- [Projects](https://eriktaheri.com/projects)`,
    `- [RSS](https://eriktaheri.com/rss.xml)`,
    "",
  ];

  if (work.length > 0) {
    lines.push("## Work Experience", "");
    for (const entry of work) {
      const end =
        typeof entry.data.dateEnd === "string"
          ? entry.data.dateEnd
          : entry.data.dateEnd.getUTCFullYear().toString();
      const start = entry.data.dateStart.getUTCFullYear().toString();
      lines.push(
        `- ${entry.data.role} at ${entry.data.company} (${start}–${end})`
      );
    }
    lines.push("");
  }

  if (writing.length > 0) {
    lines.push("## Writing", "");
    for (const post of writing) {
      lines.push(
        `- [${post.data.title}](https://eriktaheri.com/writing/${post.id}): ${post.data.description}`
      );
    }
    lines.push("");
  }

  if (projects.length > 0) {
    lines.push("## Projects", "");
    for (const project of projects) {
      lines.push(
        `- [${project.data.title}](https://eriktaheri.com/projects/${project.id}): ${project.data.description}`
      );
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
