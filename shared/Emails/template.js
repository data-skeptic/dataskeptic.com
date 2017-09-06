const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

export const getEmail = (data, type = "default") => {
    const template = fs.readFileSync(path.resolve( __dirname, "layout.ejs" ), 'utf-8');

    let email =  ejs.render(template, {...data, type});

    return email;
}
