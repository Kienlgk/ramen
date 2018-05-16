import {Sequelize} from 'sequelize';
import * as SequelizeStatic from 'sequelize';

export enum TableStatus {
    Available = 1,
    Using
}


export interface TableAttributes {
    status: number;
    title: string;
    currentOrder: number;
}

export interface TableInstance extends SequelizeStatic.Instance<TableAttributes> {
    id: number;
    title: string
    createdAt: Date;
    updatedAt: Date;
    status: TableStatus;
    currentOrder: number;
}

export default function defineTable(sequelize: SequelizeStatic.Sequelize, DataTypes: SequelizeStatic.DataTypes) {
    var Table = sequelize.define('Table', {
        status: DataTypes.ENUM('Available', 'Using'),
        title: DataTypes.STRING,
        currentOrder: DataTypes.INTEGER
    }, {});

    return Table;
}
