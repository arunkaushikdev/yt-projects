console.log('RENDERER: the page is running');

const info = document.getElementById('info');
info.innerText = `Electron ${window.versions.electron}, Chrome ${window.versions.chrome}, Node ${window.versions.node}`;

const check = document.getElementById('require-check');
check.innerText = `typeof require in the page: ${typeof require}`;
