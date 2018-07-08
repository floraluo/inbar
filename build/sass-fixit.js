const http = require('https');
const fs = require('fs')
const path = require('path')
const sass = require('node-sass/lib/extensions')
const version = require('node-sass/package.json').version
const bindingPath = path.join(sass.getBinaryDir(), sass.getBinaryName().replace(/_(?=binding\.node)/, '/'))
const bindingUrl = `https://github.com/sass/node-sass/releases/download/v${version}/${sass.getBinaryName()}`

function ensurePath () {
  const paths = [path.dirname(bindingPath)]
  while(paths.length > 0) {
    const i = paths[0]
    const parentDir = path.dirname(i)
    if (!fs.existsSync(parentDir)) {
      paths.unshift(parentDir)
      continue
    }
    if (!fs.existsSync(i)) {
      fs.mkdirSync(i)
    }
    paths.shift()
  }
}


function redirect(http, callback) {
  return function (response) {
    const location = response.headers.location
    if (location) {
      http.get(location, redirect(http, callback)).end()
    } else {
      callback(response)
    }
  }
}

const callback = function(response){
  const size = response.headers['content-length']
  let downloaded = 0
  response.on('data', function(data) {
    fs.appendFileSync(bindingPath, data)
    downloaded += data.length
    const percent = (downloaded / size * 100).toFixed(1)
    console.info(`download... %${percent}`)
  })

  response.on('error', function () {
    console.info(`Can't' download sass binding for Node.js`)
  })

  response.on('end', function() {
    console.info(
      `\nThe sass binding file has been saved:\n`
        + `    path => ${bindingPath}\n`
        + `    size => ${fs.statSync(bindingPath).size}\n\n`
    )
  })
}

function doInstall () {
  console.info('Preparing vendor directory ...')
  ensurePath()
  console.info('Start downloading ...')
  const request = http.get(bindingUrl, redirect(http, callback))
  request.setTimeout(10000)
  request.end()
}

function forceInstall () {
  if (fs.existsSync(bindingPath)) {
    console.info('Found sass node binding file saved previously.\nTrying deleting it...')
    fs.unlink(bindingPath)
    console.info('The old sass binding file has been removed.')
  }
  doInstall()
}

function tryInstall() {
  if (!fs.existsSync(bindingPath)) {
    doInstall()
  } else {
    console.info('Sass binding for Node.js has already been installed.')
  }
}


const argv = process.argv.map(a => a)

while (argv.length > 0) {
  const arg = argv[0]
  if (/.*npm$/.test(arg) || /.*node$/.test(arg) || new RegExp(`.*${__filename}$`).test(arg)) {
    argv.shift()
  } else {
    break
  }
}

if (argv.length == 0) {
  tryInstall()
}
else if (argv[0] == '-f') {
  forceInstall()
}
else {
  console.error(`Usage\n\tnode ${__filename} [-f]\n\n`)
}

// tryInstall()
