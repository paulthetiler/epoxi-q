(() => {
  const fields = ['tile-length','tile-width','joint-width','tile-depth','area'];
  const inputs = fields.map(id => document.getElementById(id)).filter(Boolean);
  const result = document.getElementById('calc-cartridges');
  const detail = document.getElementById('calc-detail');
  if (!inputs.length || !result) return;

  // CONFIG: replace with validated product data before launch.
  // Formula estimates joint volume in litres; cartridge usable volume is intentionally
  // isolated here so final manufacturer data can be dropped in without changing the UI.
  const CONFIG = { cartridgeLitres: 0.40, wasteFactor: 1.10 };

  function calculate() {
    const L = +document.getElementById('tile-length').value;
    const W = +document.getElementById('tile-width').value;
    const J = +document.getElementById('joint-width').value;
    const D = +document.getElementById('tile-depth').value;
    const A = +document.getElementById('area').value;
    if ([L,W,J,D,A].some(v => !Number.isFinite(v) || v <= 0)) {
      result.textContent = '—';
      detail.textContent = 'Enter your project dimensions to calculate.';
      return;
    }
    // Approximate grout volume: ((L+W)/(L*W))*J*D*A, with mm→m conversion.
    const litres = ((L + W) / (L * W)) * J * D * A * CONFIG.wasteFactor;
    const qty = Math.max(1, Math.ceil(litres / CONFIG.cartridgeLitres));
    result.textContent = qty;
    detail.textContent = `${litres.toFixed(2)} L estimated grout volume including 10% allowance.`;
  }
  inputs.forEach(input => input.addEventListener('input', calculate));
})();
