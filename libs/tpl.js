/*
 * @description 模板渲染
 * @auth subying
 */

const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const ejs = require('ejs');

const setting = require('./setting');
const viewsPath = '../'+setting.path.view;

module.exports = function(data, tpl, status){
    const file = path.join(__dirname, viewsPath, tpl+'.html');
    _.extend(this._data, data);
    this.status = status || 200;

    const _html = ejs.render(fs.readFileSync(file).toString(), this._data);

    this.body = _html;
};
