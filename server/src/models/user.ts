import * as Sequelize from 'sequelize';

export interface UserAttributes {
    email: string;
    name: string;
    password: string;
    isOwner: boolean;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    email: string;
    name: string;
    password: string;
    isOwner: boolean;
}

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    });

    return User;
}
