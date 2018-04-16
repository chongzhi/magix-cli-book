const { execSync, spawnSync } = require('child_process')
const config = {
    stdio: 'inherit'
}

spawnSync('gitbook', ['build'], config)
spawnSync('git', ['add', '-A'], config)
spawnSync('git', ['commit', '-m', '"modify book"'], config)
spawnSync('git', ['pull', 'origin', 'master'], config)
spawnSync('git', ['push', 'origin', 'master'], config)
spawnSync('git', ['checkout', 'gh-pages'], config)