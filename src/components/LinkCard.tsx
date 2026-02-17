import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Design: Quadrado azul → laranja no hover

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tag?: string;
}

export function LinkCard({ title, description, href, icon, tag }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-elevation-md hover:border-accent"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white group-hover:bg-accent transition-colors">
          {icon}
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {tag && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tag}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.a>
  );
}
