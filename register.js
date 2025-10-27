if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log("Service Worker registrado correctamente")
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    })
}