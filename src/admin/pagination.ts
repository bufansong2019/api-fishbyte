export function renderPagination(page: number, totalPages: number, urlFn: (page: number) => string): string {
	if (totalPages <= 1) return "";

	const prevBtn = page <= 1
		? `<a role="button" aria-disabled="true" class="outline" style="width:auto;margin:0">上一页</a>`
		: `<a href="${urlFn(page - 1)}" role="button" class="outline" style="width:auto;margin:0">上一页</a>`;
	const nextBtn = page >= totalPages
		? `<a role="button" aria-disabled="true" class="outline" style="width:auto;margin:0">下一页</a>`
		: `<a href="${urlFn(page + 1)}" role="button" class="outline" style="width:auto;margin:0">下一页</a>`;

	const items: (number | "...")[] = [];
	items.push(1);
	if (totalPages <= 6) {
		for (let i = 2; i <= totalPages; i++) items.push(i);
	} else {
		if (page > 3) items.push("...");
		const start = Math.max(2, page - 1);
		const end = Math.min(totalPages - 1, page + 1);
		for (let i = start; i <= end; i++) items.push(i);
		if (page < totalPages - 2) items.push("...");
		items.push(totalPages);
	}

	const pageBtns = items.map((item) =>
		item === "..."
			? `<span style="width:auto;margin:0;padding:var(--pico-spacing) 0">…</span>`
			: item === page
				? `<a role="button" aria-disabled="true" style="width:auto;margin:0">${item}</a>`
				: `<a href="${urlFn(item)}" role="button" class="outline" style="width:auto;margin:0">${item}</a>`
	).join("");

	return `
    <div style="display:flex;justify-content:center;align-items:center;gap:0.5rem;margin-top:1rem">
      ${prevBtn}
      ${pageBtns}
      ${nextBtn}
    </div>`;
}
