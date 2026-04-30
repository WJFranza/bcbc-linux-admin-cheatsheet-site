const BUILTIN_PACK_TEXT = [
`PACK|drives|Working With Drives|Safe disk identification, filesystem, LVM, and mount inspection commands. Read-only first. Verify model and serial before changing anything.|1.0
ITEM|System identity and storage snapshot|hostnamectl && echo && lsblk -f && echo && ip -br addr|Quickly shows hostname, OS/kernel, filesystems/mountpoints, and network interfaces/IPs.|Great first command before making changes or asking for help.|identity,storage,network,safe
ITEM|List filesystems and mountpoints|lsblk -f|Shows block devices, filesystem type, labels, UUIDs, and mountpoints.|Safe read-only command. Use this before mounting, formatting, or partitioning.|drives,storage,safe
ITEM|Show model and serial|lsblk -o NAME,SIZE,MODEL,SERIAL,FSTYPE,MOUNTPOINTS|Helps identify the physical disk by size, model, serial, filesystem, and mountpoint.|Do not rely only on /dev/sdX names. They can change between boots.|drives,hardware,safe
ITEM|Show filesystem UUIDs|blkid|Prints block device attributes including UUID and filesystem type.|Useful for /etc/fstab work, but read the output carefully.|drives,uuid,safe
ITEM|Check for existing signatures without wiping|sudo wipefs -n /dev/sdX|Shows filesystem/partition signatures that would be detected.|The -n flag means no action. Remove -n only when you are absolutely sure.|drives,signatures,caution
ITEM|Show physical volumes|sudo pvs|Lists LVM physical volumes.|Read-only LVM inventory command.|lvm,storage,safe
ITEM|Show volume groups|sudo vgs|Lists LVM volume groups and available free space.|Helpful before resizing logical volumes.|lvm,storage,safe
ITEM|Show logical volumes and backing devices|sudo lvs -a -o +devices|Lists logical volumes and the physical devices behind them.|Useful for understanding where data actually lives.|lvm,storage,safe
ITEM|Find biggest folders on current filesystem|sudo du -xhd1 / | sort -h|Shows top-level disk usage without crossing into other mounted filesystems.|Good for root filesystem cleanup. The -x flag helps avoid chasing mounted drives.|cleanup,storage,safe`,

`PACK|terminal|Terminal Basics|Everyday shell navigation and inspection commands for beginners and working technicians.|1.0
ITEM|Show current folder|pwd|Prints the current working directory.|Useful before running commands that create, move, or delete files.|terminal,navigation,safe
ITEM|List files with details|ls -lah|Shows files, hidden files, permissions, owners, sizes, and timestamps.|Use this constantly when checking where you are and what changed.|terminal,files,safe
ITEM|Change directory|cd /path/to/folder|Moves your shell into another folder.|Use quotes around paths with spaces.|terminal,navigation,safe
ITEM|Go back to previous folder|cd -|Returns to the previous directory.|Very handy when bouncing between two locations.|terminal,navigation,safe
ITEM|Make a dated work folder|mkdir -p ~/Documents/bcbc-work/$(date +%F)-work-session|Creates a dated working folder for organized project notes and outputs.|Fits the breadcrumb habit: dated directories make cleanup easier later.|terminal,organization,safe
ITEM|Copy with progress using rsync|rsync -aHAX --info=progress2 SOURCE/ DEST/|Copies files while preserving metadata and showing progress.|Check SOURCE and DEST carefully. A trailing slash changes behavior.|copy,backup,rsync,caution
ITEM|View recent command history|history | tail -40|Shows recent shell commands.|Good for reconstructing what happened during troubleshooting.|terminal,history,safe`,

`PACK|search|Search With grep and find|Fast ways to search files, logs, directories, command output, and extended regular expressions.|1.1
ITEM|Search text in files|grep -Rni "search text" /path/to/folder|Recursively searches files and shows matching line numbers.|Quote your search text. Start in a narrow folder to avoid huge scans.|grep,search,safe
ITEM|Search case-insensitive|grep -Rni "error" /var/log|Finds matches regardless of uppercase/lowercase.|Useful for logs where wording varies.|grep,logs,safe
ITEM|Search command output|systemctl --failed | grep -i service|Pipes command output into grep for filtering.|The pipe symbol sends output from the left command to the right command.|grep,pipe,systemd,safe
ITEM|Find files by name|find /path/to/search -iname "*filename*"|Finds files or directories by name, ignoring case.|Use quotes around wildcard patterns so the shell does not expand them too early.|find,search,safe
ITEM|Find large files|find / -xdev -type f -size +1G -ls 2>/dev/null|Finds files larger than 1GB on the current filesystem.|The -xdev flag avoids crossing into other mounted filesystems.|find,cleanup,safe
ITEM|Watch a log live|sudo tail -f /var/log/syslog|Shows new log lines as they arrive.|Press Ctrl+C to stop watching.|logs,tail,safe
ITEM|Extended regex search with egrep|egrep -Rni "error|failed|denied" /var/log 2>/dev/null|Searches recursively for multiple words using extended regular expressions.|Some log files require sudo. No output usually means no matches or no permission.|egrep,grep,logs,regex,safe
ITEM|Modern egrep equivalent|grep -ERni "error|failed|denied" /var/log 2>/dev/null|Same idea as egrep, but uses modern grep -E syntax.|grep -E is preferred because egrep is considered legacy on some systems.|grep,regex,logs,safe
ITEM|Find lines starting with a word|grep -Eri "^error" /var/log 2>/dev/null|Finds lines where the word error appears at the beginning of a line.|The ^ symbol means start of line.|grep,regex,logs,safe
ITEM|Find lines ending with a word|grep -Eri "failed$" /var/log 2>/dev/null|Finds lines where failed appears at the end of a line.|The $ symbol means end of line.|grep,regex,logs,safe
ITEM|Search for IP addresses|grep -ERn "([0-9]{1,3}\\.){3}[0-9]{1,3}" /var/log 2>/dev/null|Searches logs for IPv4-looking addresses.|This finds IP-like patterns, not guaranteed valid IP addresses.|grep,regex,network,logs,safe
ITEM|Search Apache logs for common problems|sudo grep -Eri "error|client denied|not found|permission" /var/log/apache2 2>/dev/null|Looks through Apache logs for common failure words.|Uses sudo because Apache logs may not be readable by a normal user.|apache,grep,logs,sudo
ITEM|Exclude noisy matches|grep -ERni "error|failed" /var/log 2>/dev/null | grep -vi "permission denied"|Searches for errors, then removes lines containing permission denied.|The second grep filters the first grep output.|grep,pipe,logs,filter
ITEM|Show only matching text|grep -ERoh "error|failed|denied" /var/log 2>/dev/null|Prints only the matching words instead of full lines.|Useful for quick counting or checking what terms are present.|grep,regex,logs,safe
ITEM|Count matching lines|grep -ERci "error|failed|denied" /var/log 2>/dev/null|Counts matching lines per file instead of printing every match.|Great when the normal output is too large.|grep,count,logs,safe
ITEM|Search config files for enabled settings|grep -ERni "^(Listen|ServerName|DocumentRoot)" /etc/apache2 2>/dev/null|Searches Apache config files for common active directives.|The ^ anchor helps find lines that start with those directive names.|apache,grep,config,regex`,

`PACK|network|Network Quick Checks|Simple commands for checking IP addresses, routes, ports, and network services.|1.0
ITEM|Show brief IP addresses|ip -br addr|Compact view of network interfaces and IP addresses.|Great first network check.|network,ip,safe
ITEM|Show routes|ip route|Displays the routing table and default gateway.|Use this to confirm where traffic should leave the machine.|network,routes,safe
ITEM|Check listening TCP/UDP ports|sudo ss -tulpn|Shows listening ports and the processes that own them.|Useful for Apache, Pi-hole, Ollama, dashboards, and local services.|network,ports,safe
ITEM|Check one port|sudo ss -tulpn | grep ':8080'|Filters listening sockets for a specific port.|Change the port number as needed.|network,ports,grep,safe
ITEM|Test a local web endpoint|curl -I http://127.0.0.1/|Fetches HTTP headers from localhost.|A fast way to confirm Apache or a local dashboard is responding.|network,http,curl,safe
ITEM|Ping default gateway|ping -c 4 192.168.0.1|Sends four pings to the gateway.|Change the IP to match the local network.|network,ping,safe`,

`PACK|services|Services and Logs|Systemd commands for service status, failures, logs, and startup behavior.|1.0
ITEM|Show failed units|systemctl --failed|Lists failed systemd units.|Start here when something feels broken after boot.|systemd,services,safe
ITEM|Check a service|systemctl status apache2 --no-pager|Shows current status and recent logs for a service.|Replace apache2 with docker, pihole-FTL, ollama, or another service.|systemd,services,safe
ITEM|Follow service logs|journalctl -u apache2 -f|Watches logs for a service live.|Press Ctrl+C to stop watching.|systemd,logs,safe
ITEM|Show boot errors|journalctl -p err -b --no-pager|Displays error-priority logs from the current boot.|Good for troubleshooting failed boots or driver issues.|systemd,logs,boot,safe
ITEM|Enable a service at boot|sudo systemctl enable apache2|Sets a service to start automatically.|Only enable services you actually want at boot.|systemd,startup,caution
ITEM|Restart a service|sudo systemctl restart apache2|Restarts a service.|Use status and logs after restarting to verify clean startup.|systemd,services,caution`
];

let packs = [];
let activePackId = "all";
let searchTerm = "";
let activeTag = "";

function splitEscapedPipe(line) {
  const out = [];
  let buf = "";
  let escaped = false;
  for (const ch of line) {
    if (escaped) {
      buf += ch;
      escaped = false;
    } else if (ch === "\\") {
      escaped = true;
    } else if (ch === "|") {
      out.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  out.push(buf.trim());
  return out;
}

function slugify(value) {
  return String(value || "pack")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "pack";
}

function parsePack(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"));

  if (!lines.length) throw new Error("Pack is empty.");

  const header = splitEscapedPipe(lines[0]);
  if (header[0] !== "PACK") throw new Error("First non-comment line must start with PACK.");

  const pack = {
    id: slugify(header[1] || header[2] || "pack"),
    title: header[2] || header[1] || "Untitled Pack",
    description: header[3] || "",
    version: header[4] || "1.0",
    sourceText: text.trim(),
    items: []
  };

  for (const line of lines.slice(1)) {
    const parts = splitEscapedPipe(line);
    if (parts[0] !== "ITEM") continue;
    pack.items.push({
      title: parts[1] || "Untitled item",
      command: parts[2] || "",
      explanation: parts[3] || "",
      note: parts[4] || "",
      tags: (parts[5] || "").split(",").map(t => t.trim()).filter(Boolean)
    });
  }

  if (!pack.items.length) throw new Error("No ITEM records found.");
  return pack;
}


function parseItemLines(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"));

  if (!lines.length) throw new Error("No item lines found.");
  if (!lines.every(line => splitEscapedPipe(line)[0] === "ITEM")) {
    throw new Error("Loose item import can only contain ITEM lines. Use a full PACK block to replace a whole pack.");
  }

  return lines.map(line => {
    const parts = splitEscapedPipe(line);
    return {
      title: parts[1] || "Untitled item",
      command: parts[2] || "",
      explanation: parts[3] || "",
      note: parts[4] || "",
      tags: (parts[5] || "").split(",").map(t => t.trim()).filter(Boolean)
    };
  });
}

function bumpMinorVersion(version) {
  const match = String(version || "1.0").match(/^(\d+)\.(\d+)$/);
  if (!match) return "1.1";
  return `${match[1]}.${Number(match[2]) + 1}`;
}

function appendItemsToCurrentPack(text) {
  const pack = activePack();
  if (!pack) throw new Error("No active pack selected.");

  const newItems = parseItemLines(text);
  const existingKeys = new Set(pack.items.map(item => `${item.title}||${item.command}`));

  const uniqueNewItems = [];
  let skipped = 0;

  for (const item of newItems) {
    const key = `${item.title}||${item.command}`;
    if (existingKeys.has(key)) {
      skipped++;
      continue;
    }
    existingKeys.add(key);
    uniqueNewItems.push(item);
  }

  if (!uniqueNewItems.length) {
    throw new Error("No new unique items to append. They may already exist in this pack.");
  }

  const updatedPack = {
    ...pack,
    version: bumpMinorVersion(pack.version),
    sourceText: "",
    items: [...pack.items, ...uniqueNewItems]
  };

  updatedPack.sourceText = serializePack(updatedPack);
  saveImportedPack(updatedPack);
  activePackId = updatedPack.id;
  loadBuiltins();

  return { pack: updatedPack, added: uniqueNewItems.length, skipped };
}

function smartImportText(text) {
  const firstLine = String(text || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .find(line => line && !line.startsWith("#"));

  if (!firstLine) throw new Error("Import text is empty.");

  if (firstLine.startsWith("PACK|")) {
    const pack = importPackFromText(text);
    return `Imported/replaced pack: ${pack.title}`;
  }

  if (firstLine.startsWith("ITEM|")) {
    const result = appendItemsToCurrentPack(text);
    const skipped = result.skipped ? ` ${result.skipped} duplicate item(s) skipped.` : "";
    return `Appended ${result.added} item(s) to: ${result.pack.title}.${skipped}`;
  }

  throw new Error("First useful line must start with PACK| or ITEM|.");
}

function loadBuiltins() {
  const builtins = BUILTIN_PACK_TEXT.map(parsePack);
  const imported = getImportedPacks();

  // One visible pack per id.
  // Imported packs override built-ins with the same id, preventing duplicate buttons
  // where both entries highlight but only one pack displays.
  const byId = new Map();
  for (const pack of builtins) byId.set(pack.id, pack);
  for (const pack of imported) byId.set(pack.id, pack);

  packs = Array.from(byId.values());

  if (!activePackId || (activePackId !== "all" && !packs.some(p => p.id === activePackId))) {
    activePackId = "all";
  }
  render();
}

function getImportedPacks() {
  try {
    return JSON.parse(localStorage.getItem("bcbcImportedPacks") || "[]");
  } catch {
    return [];
  }
}

function saveImportedPack(pack) {
  const imported = getImportedPacks().filter(p => p.id !== pack.id);
  imported.push(pack);
  localStorage.setItem("bcbcImportedPacks", JSON.stringify(imported));
}

function activePack() {
  if (activePackId === "all") return null;
  return packs.find(p => p.id === activePackId) || null;
}

function allItems() {
  return packs.flatMap(pack =>
    pack.items.map(item => ({
      ...item,
      packId: pack.id,
      packTitle: pack.title
    }))
  );
}

function allTagsFor(pack) {
  const items = pack ? pack.items : allItems();
  return [...new Set(items.flatMap(item => item.tags))].sort((a,b) => a.localeCompare(b));
}

function filteredItems(pack) {
  const q = searchTerm.toLowerCase().trim();
  const items = pack ? pack.items : allItems();
  return items.filter(item => {
    const haystack = [
      item.title,
      item.command,
      item.explanation,
      item.note,
      item.packTitle || "",
      item.tags.join(" ")
    ].join(" ").toLowerCase();
    const matchesSearch = !q || haystack.includes(q);
    const matchesTag = !activeTag || item.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });
}

function renderPackList() {
  const el = document.getElementById("packList");
  const localIds = new Set(getImportedPacks().map(pack => pack.id));
  el.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "pack-button" + (activePackId === "all" ? " is-active" : "");
  allBtn.type = "button";
  allBtn.innerHTML = `<strong>All Packs</strong><span>${allItems().length} items across ${packs.length} packs</span>`;
  allBtn.addEventListener("click", () => {
    activePackId = "all";
    activeTag = "";
    render();
  });
  el.appendChild(allBtn);

  packs.forEach(pack => {
    const btn = document.createElement("button");
    btn.className = "pack-button" + (pack.id === activePackId ? " is-active" : "");
    btn.type = "button";
    const localLabel = localIds.has(pack.id) ? " · local" : "";
    btn.innerHTML = `<strong>${escapeHtml(pack.title)}</strong><span>${pack.items.length} items · v${escapeHtml(pack.version)}${localLabel}</span>`;
    btn.addEventListener("click", () => {
      activePackId = pack.id;
      activeTag = "";
      render();
    });
    el.appendChild(btn);
  });
}

function renderTagFilter(pack) {
  const select = document.getElementById("tagFilter");
  const tags = allTagsFor(pack);
  select.innerHTML = `<option value="">All tags</option>` + tags
    .map(tag => `<option value="${escapeAttr(tag)}"${tag === activeTag ? " selected" : ""}>${escapeHtml(tag)}</option>`)
    .join("");
}


function renderLocalPackSelect() {
  const select = document.getElementById("localPackSelect");
  if (!select) return;

  const imported = getImportedPacks();
  if (!imported.length) {
    select.innerHTML = `<option value="">No local packs found</option>`;
    return;
  }

  select.innerHTML = `<option value="">Choose local pack...</option>` + imported
    .map(pack => `<option value="${escapeAttr(pack.id)}">${escapeHtml(pack.title)} (${escapeHtml(pack.id)})</option>`)
    .join("");
}

function deleteLocalPackById(packId) {
  if (!packId) throw new Error("No local pack selected.");

  const imported = getImportedPacks();
  const target = imported.find(pack => pack.id === packId);
  if (!target) throw new Error("Selected local pack was not found.");

  const ok = confirm(`Delete local imported/modified pack "${target.title}"?\n\nIf this overrides a built-in pack, the built-in version will be restored.\n\nUse Export all first if you want a backup.`);
  if (!ok) return null;

  const remaining = imported.filter(pack => pack.id !== packId);
  localStorage.setItem("bcbcImportedPacks", JSON.stringify(remaining));

  if (activePackId === packId) activePackId = "all";
  loadBuiltins();

  return target;
}

function validatePacks() {
  const messages = [];
  const seenPackIds = new Set();

  for (const pack of packs) {
    if (!pack.id) messages.push(`Pack missing id: ${pack.title || "Untitled"}`);
    if (seenPackIds.has(pack.id)) messages.push(`Duplicate visible pack id: ${pack.id}`);
    seenPackIds.add(pack.id);

    if (!pack.title) messages.push(`Pack ${pack.id} has no title.`);
    if (!pack.items || !pack.items.length) messages.push(`Pack ${pack.title || pack.id} has no items.`);

    const seenItems = new Set();
    for (const item of pack.items || []) {
      if (!item.title) messages.push(`Pack ${pack.title} has an item missing a title.`);
      if (!item.command) messages.push(`Pack ${pack.title} item "${item.title || "Untitled"}" has no command.`);
      const key = `${item.title}||${item.command}`;
      if (seenItems.has(key)) messages.push(`Duplicate item in ${pack.title}: ${item.title}`);
      seenItems.add(key);

      if (String(item.command || "").includes("rm -rf /")) {
        messages.push(`Danger check: ${pack.title} item "${item.title}" contains rm -rf /. Review carefully.`);
      }
    }
  }

  const imported = getImportedPacks();
  const importedIds = new Set();
  for (const pack of imported) {
    if (importedIds.has(pack.id)) messages.push(`Duplicate local imported pack id in storage: ${pack.id}`);
    importedIds.add(pack.id);
  }

  if (!messages.length) return `Check complete: ${packs.length} visible pack(s), no common errors found.`;
  return `Check found ${messages.length} issue(s):\n- ${messages.join("\n- ")}`;
}

function renderCards(pack) {
  const container = document.getElementById("commandCards");
  const items = filteredItems(pack);
  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = `<article class="card"><h3>No matches</h3><p>Try clearing the search box or tag filter.</p></article>`;
    return;
  }

  items.forEach(item => {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <div class="card__top">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.explanation)}</p>
          ${item.packTitle ? `<div class="note">Pack: ${escapeHtml(item.packTitle)}</div>` : ""}
        </div>
      </div>
      <div class="command-row">
        <pre class="command"><code>${escapeHtml(item.command)}</code></pre>
        <button class="small-button copy-command" type="button">Copy</button>
      </div>
      ${item.note ? `<div class="note">${escapeHtml(item.note)}</div>` : ""}
      <div class="tags">${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    `;
    article.querySelector(".copy-command").addEventListener("click", async () => {
      await copyText(item.command);
      article.querySelector(".copy-command").textContent = "Copied";
      setTimeout(() => article.querySelector(".copy-command").textContent = "Copy", 900);
    });
    container.appendChild(article);
  });
}


function renderCurrentPackPreview(pack) {
  const el = document.getElementById("currentPackPreview");
  if (!el) return;
  if (!pack) {
    el.textContent = "# All Packs view selected.\n# Select a specific pack to preview or export a single flat file.";
    return;
  }
  el.textContent = serializePack(pack);
}

function render() {
  const pack = activePack();
  const viewItems = pack ? pack.items : allItems();

  document.getElementById("packTitle").textContent = pack ? pack.title : "All Packs";
  document.getElementById("packDescription").textContent = pack
    ? pack.description
    : "Combined view across all built-in and local packs.";
  document.getElementById("packType").textContent = pack
    ? `Command pack · ${pack.items.length} items · v${pack.version}`
    : `Combined view · ${viewItems.length} items across ${packs.length} packs`;
  document.getElementById("searchInput").value = searchTerm;

  renderPackList();
  renderLocalPackSelect();
  renderTagFilter(pack);
  renderCards(pack);
  renderCurrentPackPreview(pack);
}

function serializePack(pack) {
  return pack.sourceText || [
    `PACK|${pack.id}|${pack.title}|${pack.description}|${pack.version}`,
    ...pack.items.map(item => `ITEM|${item.title}|${item.command}|${item.explanation}|${item.note}|${item.tags.join(",")}`)
  ].join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

function downloadText(filename, text) {
  const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


function exportAllPacks() {
  const stamp = new Date().toISOString().slice(0, 10);
  const text = packs.map(pack => {
    return [
      `# ------------------------------`,
      `# ${pack.title}`,
      `# Pack ID: ${pack.id}`,
      `# Exported from BCBC Linux Administrator Cheat Sheets`,
      `# ------------------------------`,
      serializePack(pack)
    ].join("\n");
  }).join("\n\n");

  downloadText(`bcbc-all-cheatsheet-packs-${stamp}.bcbc`, text);
}


function emailCurrentPack(pack) {
  const packText = serializePack(pack);
  const subject = encodeURIComponent(`BCBC cheat sheet pack: ${pack.title}`);
  const body = encodeURIComponent(
`Here is a BCBC flat-file cheat sheet pack.

Pack: ${pack.title}

Save the text below as ${pack.id}.bcbc, or paste it into the BCBC import box.

--- BEGIN BCBC PACK ---
${packText}
--- END BCBC PACK ---
`
  );

  const mailto = `mailto:?subject=${subject}&body=${body}`;

  if (mailto.length > 7800) {
    alert("This pack is large for an email body. Use Export current pack, then attach the .bcbc file manually.");
    return;
  }

  window.location.href = mailto;
}

function importPackFromText(text) {
  const pack = parsePack(text);
  saveImportedPack(pack);
  activePackId = pack.id;
  searchTerm = "";
  activeTag = "";
  loadBuiltins();
  return pack;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", event => {
    searchTerm = event.target.value;
    renderCards(activePack());
  });

  document.getElementById("tagFilter").addEventListener("change", event => {
    activeTag = event.target.value;
    renderCards(activePack());
  });

  document.getElementById("copyPackBtn").addEventListener("click", async () => {
    const pack = activePack();
    if (!pack) {
      alert("Select a specific pack to copy its flat file.");
      return;
    }
    await copyText(serializePack(pack));
    document.getElementById("copyPackBtn").textContent = "Copied";
    setTimeout(() => document.getElementById("copyPackBtn").textContent = "Copy flat file", 900);
  });

  document.getElementById("downloadPackBtn").addEventListener("click", () => {
    const pack = activePack();
    if (!pack) {
      alert("Select a specific pack to download it.");
      return;
    }
    downloadText(`${pack.id}.bcbc`, serializePack(pack));
  });

  document.getElementById("exportPreviewPackBtn").addEventListener("click", () => {
    const pack = activePack();
    if (!pack) {
      alert("Select a specific pack to export it.");
      return;
    }
    downloadText(`${pack.id}.bcbc`, serializePack(pack));
  });

  document.getElementById("copyPreviewPackBtn").addEventListener("click", async () => {
    const pack = activePack();
    if (!pack) {
      alert("Select a specific pack to copy its text.");
      return;
    }
    await copyText(serializePack(pack));
    document.getElementById("copyPreviewPackBtn").textContent = "Copied";
    setTimeout(() => document.getElementById("copyPreviewPackBtn").textContent = "Copy pack text", 900);
  });

  document.getElementById("emailPreviewPackBtn").addEventListener("click", () => {
    const pack = activePack();
    if (!pack) {
      alert("Select a specific pack to email it.");
      return;
    }
    emailCurrentPack(pack);
  });

  document.getElementById("printPackBtn").addEventListener("click", () => window.print());

  document.getElementById("checkPacksBtn").addEventListener("click", () => {
    const result = validatePacks();
    const status = document.getElementById("importStatus");
    if (status) status.textContent = result;
    alert(result);
  });

  document.getElementById("deleteLocalPackBtn").addEventListener("click", () => {
    const status = document.getElementById("importStatus");
    try {
      const selectedId = document.getElementById("localPackSelect").value;
      const deleted = deleteLocalPackById(selectedId);
      if (deleted && status) status.textContent = `Deleted local pack/override: ${deleted.title}`;
    } catch (err) {
      if (status) status.textContent = `Delete failed: ${err.message}`;
    }
  });

  document.getElementById("exportAllPacksBtn").addEventListener("click", () => {
    exportAllPacks();
  });

  document.getElementById("importBtn").addEventListener("click", () => {
    const status = document.getElementById("importStatus");
    try {
      const text = document.getElementById("importText").value;
      status.textContent = smartImportText(text);
      document.getElementById("importText").value = "";
    } catch (err) {
      status.textContent = `Import failed: ${err.message}`;
    }
  });

  document.getElementById("appendItemsBtn").addEventListener("click", () => {
    const status = document.getElementById("importStatus");
    try {
      const text = document.getElementById("importText").value;
      const result = appendItemsToCurrentPack(text);
      const skipped = result.skipped ? ` ${result.skipped} duplicate item(s) skipped.` : "";
      status.textContent = `Appended ${result.added} item(s) to: ${result.pack.title}.${skipped}`;
      document.getElementById("importText").value = "";
    } catch (err) {
      status.textContent = `Append failed: ${err.message}`;
    }
  });

  document.getElementById("fileInput").addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const status = document.getElementById("importStatus");
      try {
        status.textContent = smartImportText(String(reader.result || ""));
      } catch (err) {
        status.textContent = `File import failed: ${err.message}`;
      }
    };
    reader.readAsText(file);
  });

  loadBuiltins();
});
