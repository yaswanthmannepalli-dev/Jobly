import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About – NXT. | The Job Board That Respects Your Time",
  description:
    "Learn how NXT. was born from a simple frustration — and why thousands of professionals trust us to deliver only the roles worth applying to.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
