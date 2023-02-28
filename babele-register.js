Hooks.on('init', () => {
    if(typeof Babele !== 'undefined') {
        Babele.get().register({
            module: 'k4lt-fr',
            lang: 'fr',
            dir: 'compendium'
        });
    }
});
