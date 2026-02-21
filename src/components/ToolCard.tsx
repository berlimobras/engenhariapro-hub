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

export const ToolCard = ({ title, description, icon, url, tag }: ToolCardProps) => {
    const handleClick = () => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <motion.div
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group h-full"
            onClick={handleClick}
        >
            <div className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-border bg-card cursor-pointer shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300">

                {/* Top colored band with icon */}
                <div className="relative h-28 bg-primary flex items-center justify-center overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                            backgroundSize: "30px 30px"
                        }}
                    />
                    {/* Decorative circle */}
                    <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-white/5" />
                    <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-white/5" />

                    {/* Icon box */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-2 ring-white/20 shadow-lg group-hover:bg-accent group-hover:ring-accent/40 transition-all duration-300">
                        <div className="scale-125">{icon}</div>
                    </div>

                    {/* Tag */}
                    <div className="absolute top-3 right-3">
                        <span className="rounded-full bg-black/30 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white/90">
                            {tag}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">{description}</p>

                    {/* CTA Button */}
                    <button className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold
            bg-primary/8 text-primary border border-primary/15
            group-hover:bg-accent group-hover:text-white group-hover:border-accent
            transition-all duration-300">
                        <span>Acessar ferramenta</span>
                        <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
