interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          {/* Barra lateral laranja */}
          <div className="w-1 h-7 rounded-full bg-accent shrink-0" />
          <h1 className="text-xl font-extrabold tracking-tight text-foreground lg:text-2xl leading-tight">
            {title}
          </h1>
        </div>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground ml-4 leading-relaxed">{description}</p>
        )}
      </div>
      {children && (
        <div className="mt-3 sm:mt-0 sm:ml-4 shrink-0">{children}</div>
      )}
    </div>
  );
}
