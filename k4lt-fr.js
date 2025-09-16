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

function getCurrentModuleId() {
  const path = import.meta.url;
  const match = path.match(/modules\/([^/]+)\//);
  return match ? match[1] : null;
}

const MODULE_ID = getCurrentModuleId();

function addModuleLinksToSettings(app, html) {
  const MODULE_ID = getCurrentModuleId();

  const accessSection = html.querySelector("section.access.flexcol");
  if (!accessSection) {
    console.error("No <section class='access flexcol'> found in parameters");
    return;
  }

  const section = document.createElement("section");
  section.classList.add("settings", "flexcol");

  section.innerHTML = `
    <h4 class="divider">${game.i18n.localize(`${MODULE_ID}.Module.Title`)}</h4>
  `;

  const linkKeys = [
    { icon: "fab fa-github", key: "Git" },
    { icon: "fa-regular fa-mug-hot fa-bounce", key: "Donation" }
  ];

  for (let i = 0; i < linkKeys.length; i++) {
    const link = linkKeys[i];
    const localizedText = game.i18n.localize(`${MODULE_ID}.Links.${link.key}Title`);
    const localizedURL = game.i18n.localize(`${MODULE_ID}.Links.${link.key}URL`);
    const linkSection = document.createElement("section");
    linkSection.classList.add("settings", "flexcol");

    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<i class="${link.icon}"></i> ${localizedText} <sup><i class="fa-light fa-up-right-from-square"></i></sup>`;

    button.addEventListener("click", ev => {
      ev.preventDefault();
      window.open(localizedURL, "_blank");
    });

    linkSection.appendChild(button);
    section.appendChild(linkSection);
  }

  accessSection.parentNode.insertBefore(section, accessSection.nextSibling);
}

Hooks.on("renderSettings", addModuleLinksToSettings);
