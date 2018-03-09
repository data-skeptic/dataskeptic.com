const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

function getFile(file) {
  return fs.readFileSync(path.resolve(__dirname, file), 'utf-8')
}

function getTemplate(template) {
  let file = path.resolve(__dirname, 'templates/' + template + '.ejs')
  console.log(fs.existsSync(file))
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf-8')
  } else {
    return fs.readFileSync(
      path.resolve(__dirname, 'templates/default.ejs'),
      'utf-8'
    )
  }
}

export const getEmail = (data, type = 'default') => {
  const header = getFile('partials/header.ejs')
  const footer = getFile('partials/footer.ejs')
  const template = getTemplate(type)

  let email =
    ejs.render(header) +
    ejs.render(template, { ...data, type }) +
    ejs.render(footer)

  return email
}
