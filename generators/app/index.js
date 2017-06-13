const Generator = require('yeoman-generator');
const glob = require('glob');
const path = require('path');

const NAME_PREFIX = 'widget-';
const DEFAULT_VERSION = '0.1.0-alpha.0';

module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'widget_name',
            message: 'Widget name',
            required: true,
            default: NAME_PREFIX
        },{
            type: 'input',
            name: 'widget_title',
            message: 'Title',
            required: true
        }, {
            type: 'input',
            name: 'widget_version',
            message: 'Version',
            required: true,
            default: DEFAULT_VERSION
        }])
        .then((answers) => {
            this.widget_name = NAME_PREFIX + answers.widget_name;
            this.widget_title = answers.widget_title;
            this.widget_version = answers.widget_version;
        });
    }

    writing() {
        return new Promise((resolve, reject) => {
            const root = this.sourceRoot();
            
            glob(path.join(root, '**', '*.*'), (err, files) => {
                if (err) {
                    reject(err);
                }

                files.forEach((file) => {
                    this.fs.copyTpl(file, path.join(this.widget_name, file.replace(root, '')), {
                            widget_name: this.widget_name,
                            widget_title: this.widget_title,
                            widget_version: this.widget_version
                        });
                });
                
                resolve();
            });
        });
    }
};

