import { layout } from "./layout";

export interface TableInfo {
	name: string;
	rowCount: number;
}

export function dashboard(tables: TableInfo[], username?: string): string {
	const cards = tables
		.map(
			(t) => `
	    <article>
	      <header><strong><a href="/admin/tables/${t.name}">${t.name}</a></strong></header>
	      <div>${t.rowCount} 行</div>
	    </article>`,
		)
		.join("");

	return layout(
		"控制台",
		`
	    <h1>数据库概览</h1>
	    <div class="card-grid">${cards || "<p>暂无数据表</p>"}</div>`,
		username,
	);
}
