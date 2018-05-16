import {Request, Response} from "express";
import {AController} from "../interfaces/AController";
import {models} from "../../models/index";
import misc from "../../libs/misc";

class User extends AController {
    list(req: Request, res: Response) {
        res.status(200).send({
            message: 'list user'
        });
    }

    async create(req: Request, res: Response) {
        try {
            let {username, password} = req.body;
            password = misc.sha1(password);
            let user = await models.User.create({
                username, password
        })
            ;

            let j_user = user.toJSON();
            delete j_user.password;

            res.send({
                success: true,
                data: j_user
            });
        }
        catch (e) {
            res.status(500).send(e);
        }
    }


    async view(req: Request, res: Response) {
        try {
            let users = await models.User.findAll();

            res.render("user", {
                title: "User",
                users
            })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

}

const user = new User();
module.exports = user;