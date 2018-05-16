import * as Sequelize from 'sequelize';

export interface MenuAttributes {
  name: string;
  description: string;
  price: number;
  featureImage: string;
}

export interface MenuInstance extends Sequelize.Instance<MenuAttributes> {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    description: string;
    price: number;
    featureImage: string;
}

export default function defineMenu(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Menu = sequelize.define('Menu', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        feature_image: DataTypes.STRING,
    }, {
      classMethods: {
        associate: function(models) {
          let OrderMenu = sequelize.define('order_menu', {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            quantity: Sequelize.INTEGER
          });
          Menu.belongsToMany(models.Order, { through: OrderMenu });
        }
      }
    });

    return Menu;
}
