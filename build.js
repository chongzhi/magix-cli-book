/**
 * master分支存的是文档 markdown 源码
 * gh-pages存的是编译后的文档，对接github pages
 * 执行 node build 会自动提交master代码并切换到gh-pages分支，删除旧文件，从_book里复制新编译的文件到根目录下
 */

const { execSync, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const config = {
    stdio: 'inherit'
}

console.log(`开始发布文档到github pages...`)

spawnSync('gitbook', ['build'], config)
spawnSync('git', ['add', '-A'], config)
spawnSync('git', ['commit', '-m', '"modify book"'], config)
spawnSync('git', ['pull', 'origin', 'master'], config)
spawnSync('git', ['push', 'origin', 'master'], config)
spawnSync('git', ['checkout', 'gh-pages'], config)

let files = fs.readdirSync(process.cwd())
const notDeleteFiles = ['.git', '_book', 'test.js', 'node_modules']
for (const file of files) {
    if (notDeleteFiles.indexOf(file) === -1)  {
        spawnSync('rm', ['-rf', file])
    }
}

let copyFiles = fs.readdirSync(path.resolve(process.cwd(), './_book'))
for (const file of copyFiles) {
    fse.copySync(`${process.cwd()}/_book/${file}`, `${process.cwd()}/${file}`)
}

spawnSync('git', ['add', '-A'], config)
spawnSync('git', ['commit', '-m', '"publish book"'], config)
spawnSync('git', ['pull', 'origin', 'gh-pages'], config)
spawnSync('git', ['push', 'origin', 'gh-pages'], config)
spawnSync('git', ['checkout', 'master'], config)

console.log('发布完成')