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

const tagColors: Record<string, string> = {
    "Google Sheets": "bg-green-100 text-green-700",
    "Google Docs": "bg-blue-100 text-blue-700",
    "Canva": "bg-pink-100 text-pink-700",
    "ChatGPT": "bg-orange-100 text-orange-700",
    "Notion": "bg-gray-100 text-gray-700",
    "Trello": "bg-sky-100 text-sky-700",
};

export const ToolCard = ({ title, description, icon, url, tag }: ToolCardProps) => {
    const handleClick = () => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const tagColor = tagColors[tag] || "bg-purple-100 text-purple-700";

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group"
        >
            <div
                onClick={handleClick}
                className="relative overflow-hidden rounded-3xl bg-white p-5 cursor-pointer transition-all"
                style={{ boxShadow: "0 8px 32px rgba(108, 99, 255, 0.10)" }}
            >
                {/* Top row: icon + tag */}
                <div className="flex items-start justify-between mb-4">
                    {/* Icon circle — gradient roxo */}
                    <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md transition-transform group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, #6C63FF 0%, #9b59b6 100%)" }}
                    >
                        {icon}
                    </div>

                    {/* Tag pill */}
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold ${tagColor}`}>
                        {tag}
                    </span>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-gray-800 mb-1.5 leading-tight">{title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{description}</p>

                {/* CTA */}
                <div
                    className="flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #6C63FF 0%, #9b59b6 100%)" }}
                >
                    <span>Acessar</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                </div>
            </div>
        </motion.div>
    );
};
