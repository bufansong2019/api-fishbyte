import { layout, escapeHtml } from "./layout";
import { renderPagination } from "./pagination";

export interface UserRow {
	id: number;
	username: string;
	role: string;
	createdAt: string;
}

export function usersPage(users: UserRow[], page: number, total: number, username?: string, error?: string, newUsername?: string): string {
	const rows = users
		.map(
			(u) => `
	    <tr>
	      <td>${u.id}</td>
	      <td>${escapeHtml(u.username)}</td>
	      <td><span class="badge ${u.role === "admin" ? "badge-green" : ""}">${u.role === "admin" ? "管理员" : "用户"}</span></td>
	      <td>${u.createdAt}</td>
	      <td>
	        <form method="POST" action="/admin/users/${u.id}/delete" style="display:inline" onsubmit="return confirm('确定要删除用户「${escapeHtml(u.username)}」吗？')">
	          <button type="submit" class="outline secondary" style="width:auto;margin-bottom:0;font-size:0.8rem">删除</button>
	        </form>
	      </td>
	    </tr>`,
		)
		.join("");

	const errorHtml = error ? `<div class="alert-error">${escapeHtml(error)}</div>` : "";
	const successHtml = newUsername ? `<div class="alert-success"><p style="margin:0">用户「${escapeHtml(newUsername)}」已创建成功</p></div>` : "";

	return layout(
		"用户管理",
		`
	    <h1>用户管理</h1>
	    ${errorHtml}
	    ${successHtml}
	    <details>
	      <summary><strong>创建新用户</strong></summary>
	      <form method="POST" action="/admin/users">
	        <input type="text" name="username" placeholder="用户名" required>
	        <input type="password" name="password" placeholder="密码（至少6位）" required>
	        <select name="role">
	          <option value="user">普通用户</option>
	          <option value="admin">管理员</option>
	        </select>
	        <button type="submit">创建</button>
	      </form>
	    </details>
	    <figure>
	      <table>
	        <colgroup>
	          <col style="width:10%">
	          <col style="width:25%">
	          <col style="width:15%">
	          <col style="width:30%">
	          <col style="width:20%">
	        </colgroup>
	        <thead><tr><th>ID</th><th>用户名</th><th>角色</th><th>创建时间</th><th>操作</th></tr></thead>
	        <tbody>${rows || "<tr><td colspan='5'>暂无用户</td></tr>"}</tbody>
	      </table>
	    </figure>
	    ${renderPagination(page, Math.max(1, Math.ceil(total / 10)), (p) => `/admin/users?page=${p}`)}`,
		username,
	);
}
