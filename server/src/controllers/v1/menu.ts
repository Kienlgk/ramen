// import {Response, Request} from "@types/express"
import {Response, Request} from "express"
import {AController} from "../interfaces/AController";

import {models} from "../../models";

class Menu extends AController {
    async list(req: Request, res: Response) {
        try {

            let {page, perpage} = req.query;
            page = page || 0;
            perpage = perpage || 50;

            let menus = await models.Menu.findAll({
                offset: page * perpage,
                limit: perpage
            });

            res.send({
                count: menus.count(),
                data : menus
            });

        } catch (e) {
            res.status(500).send();
        }
    }

    async create(req: Request, res: Response) {
        try {
            let {name, price, description} = req.body;
            let file = (req as any).files && (req as any).files [0];
            let feature_image = file ? `${req.protocol}://${req.headers.host}/uploads/${file.filename}` : ""

            let menu = await models.Menu.create({
                name, price, description, feature_image
            });

            res.send({
                success: true,
                data: menu
            });

        } catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req: Request, res: Response){
        try {

            let id = req.params.id;
            let {name, price, description} = req.body;

            let menu = await models.Menu.findByPrimary(id);

            await menu.updaet({
                name: name || menu.name,
                description: description || menu.description,
                price: price || menu.price
            });

            res.send({
                success: true,
                data: menu
            })

        }catch(e) {
            res.status(500).send(e);
        }
    }

    async view(req: Request, res: Response) {
      try {

          let {page, perpage} = req.query;
          page = page || 0;
          perpage = perpage || 50;

          let menus = await models.Menu.findAll({
              offset: page * perpage,
              limit: perpage
          });

          res.render('menu',{
              title: 'Món ăn',
              menus : menus
          });

      } catch (e) {
          res.status(500).send();
      }
    }
    async destroy(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let menu = await models.Menu.findByPrimary(id);
            await menu.destroy();

            res.send({
                success: true
            })
        }
        catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    }

}

module.exports = new Menu();
