interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-8 rounded-full"
            style={{ background: "linear-gradient(180deg, #6C63FF, #FF6B9D)" }}
          />
          <h1 className="text-xl font-bold tracking-tight text-gray-800 lg:text-2xl">
            {title}
          </h1>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500 ml-5">{description}</p>
        )}
      </div>
      {children && <div className="mt-3 sm:mt-0">{children}</div>}
    </div>
  );
}
