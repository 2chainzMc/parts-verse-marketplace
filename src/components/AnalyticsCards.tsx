
export default function AnalyticsCards({ stats }: { stats: { label: string, value: string|number }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map(stat => (
        <div key={stat.label} className="p-4 rounded-lg bg-accent text-accent-foreground text-center shadow-md flex flex-col gap-2 animate-fade-in">
          <div className="font-extrabold text-2xl">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
