import { ExternalLink, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ExternalToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  url: string;
  tag: string;
  isLocked?: boolean;
}

export const ExternalToolCard = ({
  title,
  description,
  icon,
  url,
  tag,
  isLocked = false,
}: ExternalToolCardProps) => {
  const handleClick = () => {
    if (!isLocked) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div
        onClick={handleClick}
        className={`relative flex flex-col h-full rounded-2xl border border-border bg-card p-5 transition-all duration-200
          hover:border-accent/50 hover:shadow-lg
          ${!isLocked ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
      >
        {/* Tag */}
        <div className="absolute top-4 right-4">
          <span className="badge-accent text-[10px]">{tag}</span>
        </div>

        {/* Icon */}
        <div
          className={`mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm
            transition-all duration-200 group-hover:scale-105
            ${isLocked ? "bg-muted-foreground/40" : "bg-primary group-hover:bg-accent group-hover:shadow-md"}`}
        >
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug pr-12">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1 mb-4">{description}</p>

        {/* CTA */}
        {isLocked ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Assine para acessar</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all duration-200">
            <span>Acessar ferramenta</span>
            <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </div>
        )}

        {/* Bottom accent bar */}
        {!isLocked && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        )}
      </div>
    </motion.div>
  );
};
