/**
 * Created by 51202 on 5/5/2017.
 */
// import {Response, Request} from "@types/express"
import {Response, Request} from "express"
import {AController} from "../interfaces/AController";
import * as Sequelize from "sequelize";
import {OrderStatus} from "../../models/order";

import {models} from "../../models";
let TableModel:Sequelize.Model<any, any> = models.Table;
let OrderModel:Sequelize.Model<any, any> = models.Order;

class Table extends AController {
    async list(req: Request, res: Response) {
        try {

            let {page, perpage} = req.query;

            page = page || 0;
            perpage = perpage || 50;

            let tables = await TableModel.findAll({
                limit: perpage,
                offset: page * perpage
            });

            res.send({
                count: tables.count(),
                data: tables
            })

        } catch (e) {
            res.status(500).send();
        }
    }

    async create(req: Request, res: Response) {
        try{
            let {title} = req.body;

            let table = await TableModel.create({
                title,
                status: 'Available'
            });

            res.send({
                success: true,
                data: table
            });
        }
        catch(e){
            res.status(500).send(e);
        }
    }


    async update(req: Request, res: Response) {
        try {

            let id = req.params.id;
            let {title} = req.body;
            let {status} = req.body;
            let {currentOrder} = req.body;
            let table = await models.Table.findByPrimary(id);
            await table.update({
                title: title || table.title,
                status: status || table.status,
                currentOrder: currentOrder || table.currentOrder
            });

            res.send({
                success: true,
                data: table
            })

        }
        catch(e){
            res.status(500).send(e);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let table = await models.Table.findByPrimary(id);
            await table.destroy();
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
          let table = await TableModel.findByPrimary(id);
          let order = await OrderModel.findOne({
            where: {
              table_id: id,
              status: OrderStatus[OrderStatus.Open]
            }
          });

          res.send({
            success: true,
            data: table,
            order: order
          });
      }
      catch(e){
          res.status(500).send(e);
      }
    }

    async view(req: Request, res: Response) {
        try {
            let tables = await models.Table.findAll();
            res.render("table", {
                tables,
                title: 'Bàn ăn'
            });
        }
        catch(e){
            res.status(500).send(e);
        }
    }

}

module.exports = new Table();
