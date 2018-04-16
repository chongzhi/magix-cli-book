const { execSync, spawnSync } = require('child_process')

execSync('gitbook build')
execSync('git add -A')
execSync('git commit -m "modify book"')
execSync('git pull origin master')
execSync('git push origin master')
execSync('git checkout gh-pages')