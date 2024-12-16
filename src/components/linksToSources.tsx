import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const LinksToSources = ({
  sources,
  name,
}: {
  sources: string[];
  name: string;
}) => {
  return (
    <Accordion type="single" collapsible className={cn("max-w-dvw")}>
      <AccordionItem value={`Links to sources for ${name}`}>
        <AccordionTrigger>Links to sources</AccordionTrigger>
        <AccordionContent>
          <ul className={cn("flex flex-col gap-2 max-w-dvw")}>
            {sources.map((source, index) => {
              return (
                <a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={source}
                  className={cn("text-ellipsis max-w-[100px] py-4")}
                >
                  <li>{source}</li>
                </a>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
