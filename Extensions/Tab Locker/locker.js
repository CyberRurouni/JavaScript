(function () {
  const OVERLAY_ID = "tab-lock-overlay";
  const PASS_KEY = "tabPassword";

  function createOverlay(message) {
    if (document.getElementById(OVERLAY_ID)) return;

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: #111;
      color: #fff;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      z-index: 999999;
    `;
    overlay.innerHTML = `
      <div style="font-size:18px;margin-bottom:10px">${message}</div>
      <input type="password" id="tabPassInput" placeholder="Enter password" style="padding:8px;font-size:16px"/>
      <button id="tabPassBtn" style="margin-top:10px;padding:6px 12px;font-size:16px">Unlock</button>
    `;
    document.body.appendChild(overlay);

    document.getElementById("tabPassBtn").onclick = () => {
      const input = document.getElementById("tabPassInput").value;
      const saved = localStorage.getItem(PASS_KEY);
      if (input === saved) {
        overlay.remove();
      } else {
        alert("Wrong password!");
      }
    };
  }

  window.addEventListener("load", () => {
    let savedPass = localStorage.getItem(PASS_KEY);

    if (!savedPass) {
      const newPass = prompt("Set a password for this tab (first-time setup):");
      if (newPass) {
        localStorage.setItem(PASS_KEY, newPass);
        alert("Password set! Refresh to apply lock.");
      }
    } else {
      createOverlay("🔒 This tab is locked");
    }
  });
})();
