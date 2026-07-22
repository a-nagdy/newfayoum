/** Renders blog body text with ## headings and > blockquotes. */
export function BlogArticleBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="pt-2 text-xl font-bold text-foreground sm:text-2xl"
            >
              {block.slice(3).trim()}
            </h2>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="border-s-4 border-secondary bg-muted/60 px-5 py-4 text-foreground"
            >
              {block.slice(2).trim()}
            </blockquote>
          );
        }

        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
