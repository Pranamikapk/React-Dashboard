const DOT_COLOR = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  slate: "bg-slate-400",
}

/**
 * @param {Array<{icon: React.ComponentType, title: string, time: string, accent?: keyof DOT_COLOR, badge?: string}>} items
 */
const ActivityTimeline = ({ items }) => {
  return (
    <div className="relative space-y-5 pl-1">
      {/* connecting line */}
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />

      {items.map((item, index) => (
        <div
          key={item.title + index}
          className="dashboard-fade-in relative flex gap-4"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-background bg-card shadow-sm">
            <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-background ${DOT_COLOR[item.accent] ?? DOT_COLOR.slate}`} />
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 pb-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium leading-tight">{item.title}</span>
              {item.badge && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityTimeline