let execSync = require('child_process').execSync;

execSync('npm run build', {
    stdio: 'inherit',
});

execSync('electron .', {
    stdio: 'inherit',
});