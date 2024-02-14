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
  let shopButton = $(
    `<button><i class="fa-solid fa-cart-shopping"></i> Kult · Arkhane Asylum Publishing <sup><i class="fa-light fa-up-right-from-square"></i></sup></button>`
  );
  lotdDiv.append(shopButton);
  shopButton.on("click", (ev) => {
    ev.preventDefault();
    window.open("https://arkhane-asylum.fr/shop/?v=1029", "_blank");
  });

  let githubButton = $(
    `<button><i class="fab fa-github"></i> Dépôt du module <sup><i class="fa-light fa-up-right-from-square"></i></sup></button>`
  );
  lotdDiv.append(githubButton);
  githubButton.on("click", (ev) => {
    ev.preventDefault();
    window.open("https://github.com/YanKlInnomme/FoundryVTT-k4lt-fr", "_blank");
  });

  let coffeeButton = $(
    `<button><i class="fa-regular fa-mug-hot fa-bounce"></i> Offrez-moi un café <sup><i class="fa-light fa-up-right-from-square"></i></sup></button>`
  );
  lotdDiv.append(coffeeButton);
  coffeeButton.on("click", (ev) => {
    ev.preventDefault();
    window.open("https://www.buymeacoffee.com/yank", "_blank");
  });
});