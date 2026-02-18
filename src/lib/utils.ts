import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function readingTime(html: string): string {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  return `${readingTimeMinutes} min read`;
}

export function readingTimeFromMarkdown(markdown: string): string {
  const textOnly = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_~`>|-]/g, "");
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}

export function dateRange(startDate: Date, endDate?: Date | string): string {
  const startYear = startDate.getFullYear().toString();

  let endYear: string;
  if (typeof endDate === "string") {
    endYear = endDate;
  } else if (endDate) {
    endYear = endDate.getFullYear().toString();
  } else {
    endYear = "Present";
  }

  return `${startYear} - ${endYear}`;
}
