export function showSnackbar(message: string, type: string = 'error', duration: number = 3000) {
    const snackbar = document.createElement('div');

    // setup color of the snackbar
    var color = 'rgba(190, 190, 190)';
    if (type === 'error') {
        color = 'rgb(255,89,89)';
    } else if (type === 'success') {
        color = 'rgb(136,255,136)';
    } else if (type === 'warning') {
        color = 'rgb(255,255,129)';
    }

    // setup style of the snackbar
    snackbar.style.position = 'fixed';
    snackbar.style.bottom = '0';
    snackbar.style.width = '100%';
    snackbar.style.display = 'flex';
    snackbar.style.justifyContent = 'center';

    // setup style of the text
    const snackbarText = document.createElement('p');
    snackbar.appendChild(snackbarText);
    snackbarText.innerText = message;
    snackbarText.style.backgroundColor = color;
    snackbarText.style.padding = '20px';
    snackbarText.style.borderRadius = '100px';

    // setup fading out
    snackbarText.style.transition = 'all 0.5s';
    snackbarText.style.opacity = '0';
    setTimeout(() => {
        snackbarText.style.opacity = '1';
    }, 100);

    // setup fading in
    setTimeout(() => {
        snackbarText.style.opacity = '0';
    }, duration - 1000);


    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.remove();
    }, duration);
}
