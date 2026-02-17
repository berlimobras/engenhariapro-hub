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
    if (!isLocked) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <div
        onClick={handleClick}
        className={`
          relative overflow-hidden rounded-xl border border-border/40 
          bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-lg p-6
          shadow-elevation-md transition-all duration-300 hover:shadow-elevation-lg
          hover:border-accent hover:from-card hover:to-card/90
          ${!isLocked ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
        `}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
            {tag}
          </span>
        </div>

        {/* Icon */}
        <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white group-hover:bg-accent shadow-sm group-hover:shadow-md transition-all">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="relative mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="relative mb-5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Action */}
        <div className="relative flex items-center justify-between">
          {isLocked ? (
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Assine para acessar</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              <span>Acessar ferramenta</span>
              <ExternalLink className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
