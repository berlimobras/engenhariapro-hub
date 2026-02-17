import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ToolCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    url: string;
    tag: string;
}

// NOVO componente - teste com ícones quadrados AZUIS
export const ToolCard = ({
    title,
    description,
    icon,
    url,
    tag,
}: ToolCardProps) => {
    const handleClick = () => {
        window.open(url, "_blank", "noopener,noreferrer");
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
                className="relative overflow-hidden rounded-xl border border-border/40 bg-card p-6 shadow-md hover:shadow-lg hover:border-accent transition-all cursor-pointer"
            >
                {/* Tag */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                        {tag}
                    </span>
                </div>

                {/* Icon QUADRADO AZUL → LARANJA */}
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[#001f3d] text-white group-hover:bg-[#ff8c00] shadow-sm transition-all">
                    {icon}
                </div>

                {/* Content */}
                <h3 className="relative mb-2 text-lg font-bold text-foreground">
                    {title}
                </h3>
                <p className="relative mb-5 text-sm text-muted-foreground line-clamp-2">
                    {description}
                </p>

                {/* Action */}
                <div className="relative flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    <span>Acessar ferramenta</span>
                    <ExternalLink className="h-4 w-4" />
                </div>
            </div>
        </motion.div>
    );
};
