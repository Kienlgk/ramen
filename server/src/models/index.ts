'use strict';

import {Sequelize} from "sequelize";
import * as SequelizeStatic from "sequelize";

var fs = require('fs');
var path = require('path');
import * as config from "../libs/config";
import * as eventEmmiter from "../events";


class Database {
    private _basename: string;
    private _models: any;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);

        let dbConfig = config.database;
        console.log("config", dbConfig);
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter(fileNameFilter)
        .forEach((file: string) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });

        fs.readdirSync(path.join(__dirname, "hooks")).filter(fileNameFilter)
        .forEach(async (file: string) => {
            var hook = require(path.join(__dirname, "hooks", file));
            await hook(this._models, eventEmmiter);
        });

    }

    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }
}

function fileNameFilter(file: string) {
  let _basename = path.basename(module.filename);
  return (file !== _basename) && (file !== "interfaces") && (file !== "hooks") && (file[0] !== '_') && (file[0] !== '.');
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
