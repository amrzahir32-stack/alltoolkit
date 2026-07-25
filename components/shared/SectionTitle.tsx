interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}