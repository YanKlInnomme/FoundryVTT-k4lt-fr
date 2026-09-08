// k4lt-fr.js

async function ensureEchoAdventure() {
  if (!game.user?.isGM) return;
  const pack = game.packs.get("k4lt-fr.scenarios-officiels");
  if (!pack) return console.error("KULT Extra FR | Pack Scénarios Officiels introuvable.");
  const index = await pack.getIndex({ fields: ["name"] });
  if (index.some(entry => entry.name === "Écho du Passé")) return;
  let wasLocked = pack.locked ?? pack.metadata?.locked ?? false;
  try {
    const response = await fetch("modules/k4lt-fr/data/echo-du-passe.json");
    if (!response.ok) throw new Error(`Impossible de charger les données de l'aventure (${response.status})`);
    const data = await response.json();
    if (wasLocked) await pack.configure({ locked: false });
    await Adventure.implementation.createDocuments([data], { pack: pack.collection, keepId: true });
    ui.notifications.info("KULT Extra FR | Écho du Passé ajouté aux Scénarios Officiels.");
  } catch (error) {
    console.error("KULT Extra FR | Impossible d'ajouter Écho du Passé.", error);
    ui.notifications.error("KULT Extra FR | Échec de l'ajout d'Écho du Passé. Consultez la console.");
  } finally {
    if (wasLocked && !pack.locked) await pack.configure({ locked: true });
  }
}
Hooks.on('init', () => {
  if (typeof game.babele !== 'undefined') {
    game.babele.register({
      module: 'k4lt-fr',
      lang: 'fr',
      dir: 'compendium'
    });
  }
});
Hooks.on("importAdventure", (adventure, data) => {
  kultLogger(`Adventure imported: ${adventure.name}. Waiting 3 seconds before regenerating scene thumbnails...`);
  setTimeout(async () => {
    for (const scene of game.scenes.contents) {
      try {
        kultLogger(`Regenerating thumbnail for: ${scene.name}`);
        const thumb = await scene.createThumbnail({ img: scene.background.src });
        await scene.update({ thumb: thumb.thumb });
      } catch (err) {
        kultLogger(`Error regenerating thumbnail for scene ${scene.name}`, err);
      }
    }
    kultLogger("All scene thumbnails have been regenerated after adventure import!");
  }, 3000);
});
/* ----------------------------------------- */
/* SETTINGS LINKS                            */
/* ----------------------------------------- */
function addDTLinksToSettings(app, htmlElement) {
  const html = htmlElement instanceof HTMLElement ? htmlElement : htmlElement?.[0];
  if (!html) return;
  const settingsBlocks = [...html.querySelectorAll("section.settings.flexcol")];
  const targetBlock = settingsBlocks.find(block =>
    block.querySelector(
      'button[data-action="openApp"][data-app="configure"]',
    )
  );
  if (!targetBlock) {
    console.warn("KULT Extra FR | Settings block not found");
    return;
  }
  const buttons = targetBlock.querySelectorAll(
    'button[data-action="openApp"]',
  );
  if (!buttons.length) {
    console.warn("KULT Extra FR | No settings buttons found");
    return;
  }
  const lastButton = buttons[buttons.length - 1];
  if (targetBlock.querySelector(".dt-links")) return;
  const section = document.createElement("section");
  section.classList.add(
    "settings",
    "flexcol",
    "dt-links",
  );
  section.innerHTML = `
    <h4 class="divider" style="margin-top: 1rem;">
      ${game.i18n.localize("k4lt-fr.Module.Title")}
    </h4>
  `;
  const links = [
    {
      icon: "fab fa-github",
      key: "Git",
    },
    {
      icon: "fa-regular fa-mug-hot fa-bounce",
      key: "Donation",
    },
  ];
  for (const { icon, key } of links) {
    const label = game.i18n.localize(
      `k4lt-fr.Links.${key}Title`,
    );
    const url = game.i18n.localize(
      `k4lt-fr.Links.${key}URL`,
    );
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = `
      <i class="${icon}"></i>
      ${label}
      <sup>
        <i class="fa-light fa-up-right-from-square"></i>
      </sup>
    `;
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      window.open(url, "_blank");
    });
    section.appendChild(btn);
  }
  targetBlock.insertBefore(
    section,
    lastButton.nextSibling,
  );
}
Hooks.on("renderSettings", addDTLinksToSettings);
