export default function DashboardNav() {
	return (
		<aside className="hidden md:block md:w-60 border-r border-slate-800 p-4">
			<div className="text-xs uppercase tracking-wide text-slate-400">Filters</div>
			<ul className="mt-3 space-y-2 text-sm">
				<li className="text-slate-300">Published</li>
				<li className="text-slate-300">Exceptions</li>
				<li className="text-slate-300">Awaiting review</li>
			</ul>
		</aside>
	);
}