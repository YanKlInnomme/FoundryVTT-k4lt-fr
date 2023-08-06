Hooks.on('init', () => {
  if(typeof Babele !== 'undefined') {
      Babele.get().register({
          module: 'k4lt-fr',
          lang: 'fr',
          dir: 'compendium'
      });
  }
});

Hooks.on("renderSettings", (app, html) => {
  let lotdSection = $("<h2>K4lt-fr Liens</h2>");
  html.find("#settings-game").after(lotdSection);
  let lotdDiv = $(`<div></div>`);
  lotdSection.after(lotdDiv);
  let helpButton = $(
    `<button><i class="fa-solid fa-cart-shopping"></i> Kult · Arkhane Asylum Publishing</button>`
  );
  lotdDiv.append(helpButton);
  helpButton.on("click", (ev) => {
    ev.preventDefault();
    window.open("https://arkhane-asylum.fr/categorie/kult/", "_blank");
  });

  let dicordButton = $(
    `<button><i class="fab fa-github"></i> Dépôt du module</button>`
  );
  lotdDiv.append(dicordButton);
  dicordButton.on("click", (ev) => {
    ev.preventDefault();
    window.open("https://github.com/YanKlInnomme/FoundryVTT-k4lt-fr", "_blank");
  });

  let patreonButton = $(
    `<button><i class="fa-solid fa-heart fa-beat fa-xs"></i> Soutenez-moi via Tipeee</button>`
  );
  lotdDiv.append(patreonButton);
  patreonButton.on("click", (ev) => {
    ev.preventDefault();
    window.open("https://fr.tipeee.com/yank", "_blank");
  });
});