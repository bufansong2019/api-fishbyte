export function renderToast(): string {
	return `<div id="toast" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.85);color:#fff;padding:0.75rem 2rem;border-radius:8px;font-size:1rem;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:999"></div>
<script>
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.opacity = '1';
    setTimeout(() => t.style.opacity = '0', 2000);
  }
</script>`;
}
