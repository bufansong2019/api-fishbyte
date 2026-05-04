import { layout, escapeHtml } from "./layout";
import { renderPagination } from "./pagination";
import { renderToast } from "./toast";

export interface ApiKeyRow {
	id: number;
	name: string;
	key: string;
	enabled: number;
	createdAt: string;
}

export function apiKeysPage(keys: ApiKeyRow[], newKey?: string, page: number = 1, total: number = 0, username?: string): string {
	function maskKey(key: string): string {
		return key.slice(0, 4) + "**********" + key.slice(-4);
	}

	const rows = keys
		.map(
			(k) => `
	    <tr>
	      <td>${escapeHtml(k.name)}</td>
	      <td><code style="cursor:pointer" onclick="copyKey('${k.key}')" title="点击复制">${maskKey(k.key)}</code></td>
	      <td><span class="badge ${k.enabled ? "badge-green" : "badge-red"}">${k.enabled ? "启用" : "禁用"}</span></td>
	      <td>${k.createdAt}</td>
	      <td>
	        <form method="POST" action="/admin/api-keys/${k.id}/toggle" style="display:inline">
	          <button type="submit" class="outline" style="width:auto;margin-bottom:0">${k.enabled ? "禁用" : "启用"}</button>
	        </form>
	        <form method="POST" action="/admin/api-keys/${k.id}/delete" style="display:inline" onsubmit="return confirm('确定要删除此密钥吗？')">
	          <button type="submit" class="outline" style="width:auto;margin-bottom:0">删除</button>
	        </form>
	      </td>
	    </tr>`,
		)
		.join("");

	const newKeyHtml = newKey
		? `<div class="alert-success">
	      <p style="margin:0 0 0.5rem;font-size:1.1rem">密钥已创建，请立即保存！关闭本页后将无法再次查看。</p>
	      <code style="background:#fff;padding:0.5rem 1rem;border-radius:4px;font-size:1rem;display:inline-block;cursor:pointer" onclick="copyKey('${newKey}')" title="点击复制">${newKey}</code>
	    </div>`
		: "";

	return layout(
		"API 密钥",
		`
	    <h1>API 密钥管理</h1>
	    ${newKeyHtml}
	    <details>
	      <summary><strong>创建新密钥</strong></summary>
	      <form method="POST" action="/admin/api-keys">
	        <input type="text" name="name" placeholder="项目名称（如：博客、工具站）" required>
	        <button type="submit">生成</button>
	      </form>
	    </details>
	    <figure id="api-keys-section">
	      <table>
	        <colgroup>
	          <col style="width:20%">
	          <col style="width:20%">
	          <col style="width:15%">
	          <col style="width:25%">
	          <col style="width:20%">
	        </colgroup>
	        <thead><tr><th>名称</th><th>密钥</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead>
	        <tbody>${rows || "<tr><td colspan='5'>暂无密钥</td></tr>"}</tbody>
	      </table>
	    </figure>
	    ${renderPagination(page, Math.max(1, Math.ceil(total / 5)), (p) => `/admin/api-keys?page=${p}#api-keys-section`)}
	    ${renderToast()}
	    <script>
	      function copyKey(key) {
	        navigator.clipboard.writeText(key).then(() => showToast("已复制到剪贴板"));
	      }
	    </script>`,
		username,
	);
}
