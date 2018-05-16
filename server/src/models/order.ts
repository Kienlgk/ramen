import * as Sequelize from 'sequelize';
import {TableInstance} from './table';

export enum OrderStatus {
    Open = 1,
    Cancelled,
    Completed
}

export interface OrderAttributes {
    status: OrderStatus;
}

export interface OrderInstance extends Sequelize.Instance<OrderAttributes> {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
}

export default function defineOrder(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Order = sequelize.define('Order', {
        status: DataTypes.ENUM('Open', 'Cancelled', 'Completed')
    }, {
        classMethods: {
            associate: function (models) {
                Order.belongsTo(models.Table);
                let OrderMenu = sequelize.define('order_menu', {
                    id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    quantity: Sequelize.INTEGER,
                    subtotal: Sequelize.INTEGER
                });
                Order.belongsToMany(models.Menu, {through: OrderMenu});
                Order.belongsTo(models.Table);
            }
        }
    });
    return Order;
}
