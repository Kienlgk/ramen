// import {Response, Request} from "@types/express"
import {Response, Request} from "express"
import {AController} from "../interfaces/AController";

import {models} from "../../models";
import {TableStatus} from "../../models/table";
import {OrderStatus} from "../../models/order";
let OrderModel = models.Order;

class Order extends AController {
    async list(req: Request, res: Response) {
        try {

            let {page, perpage} = req.query;
            page = page || 0;
            perpage = perpage || 50;

            let order = await models.Order.findAll({
                offset: page * perpage,
                limit: perpage
            });

            res.send({
                count: order.count(),
                data: order
            });

        } catch (e) {
            res.status(500).send();
        }
    }

    async create(req: Request, res: Response) {
        try {

            let {table_id, order_menu} = req.body;
            order_menu = order_menu || [];

            let table = await models.Table.findByPrimary(table_id);
            console.log('check table: ', table_id);
            console.log(table);
            if (!table) {
              return res.send({
                  success: false,
                  message: 'Table is not exsit or not available'
              });
            }
            let order = await models.Order.create({
              table_id,
              status: 'Open'
            });

            for (let om of order_menu) {
                let menu = await models.Menu.findByPrimary(om.menu_id);
                if(menu) {
                  await order.addMenu(menu, {
                      quantity: om.quantity,
                      subtotal: om.quantity * menu.price
                  });
                }
            }

            res.send({
                success: true,
                data: order
            })

        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    async update(req: Request, res: Response) {
        try {

            let id = req.params.id;
            let {order_menu} = req.body;
            if (!order_menu || !order_menu.length) {
              order_menu = [];
            }

            let order = await models.Order.findByPrimary(id, {
                include: [
                    {model: models.Menu}
                ]
            });

            let d_OrderMenus = order.Menus;

            for (let om of order_menu) {
                let isUpdate = false;
                for(let d_om of d_OrderMenus) {
                    if(d_om.id == om.menu_id) {
                        d_om.order_menu.update({
                            quantity: om.quantity,
                            subtotal: d_om.price * om.quantity
                        });
                        isUpdate = true;
                        break;
                    }
                }

                if(!isUpdate) {
                    let menu = await models.Menu.findByPrimary(om.menu_id);
                    await order.addMenu(menu, {
                        quantity: om.quantity,
                        subtotal: om.quantity * menu.price
                    });
                }
            }

            if(req.body.status) {
              await order.update({
                status: req.body.status
              });
            }

            res.send({
                success: true,
                data: order
            });


        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let order = await models.Order.findByPrimary(id);
            await order.destroy();
            res.send({
                success: true
            });
        }
        catch(e){
            res.status(500).send(e);
        }
    }

    async retrieve(req: Request, res: Response) {
      try {
          let id = req.params.id;
          let order = await OrderModel.findByPrimary(id, {
            include: [
                {model: models.Menu}
            ]
          });
          order = order.toJSON();
          let order_menus = order.Menus.map(m => {
            let om = m.order_menu;
            return {
              "id": om.id,
              "quantity": om.quantity,
              "subtotal": om.subtotal,
              "menu_id": om.menu_id
            }
          });
          order.order_menus = order_menus;
          delete order.Menus;

          res.send({
            success: true,
            data: order
          });
      }
      catch(e){
          res.status(500).send(e);
      }
    }

    async view(req: Request, res: Response) {
        try {

            let {page, perpage} = req.query;
            page = page || 0;
            perpage = perpage || 50;

            let j_orders = [];

            let orders = await models.Order.findAll({
                include: [
                    {model: models.Table},
                    {model: models.Menu}
                ]
            });

            for(let order of orders) {
                let total = 0;
                let j_order = order.toJSON();
                order.Menus.forEach((menu)=> {
                    total += menu.order_menu.subtotal;
                })

                j_order.total = total;
                j_orders.push(j_order);
            }

            res.render("order", {
                title: "Đơn hàng",
                orders: j_orders
            });

        } catch (e) {
            res.status(500).send();
        }
    }
}

module.exports = new Order();
