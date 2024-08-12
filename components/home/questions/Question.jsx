"use client";
import Accordion from "@/components/widgets/Accordion";

export default function Question({ item: { title, content } }) {
  return <Accordion title={title}>{content}</Accordion>;
}
