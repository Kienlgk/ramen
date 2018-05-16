/**
 * Created by 51202 on 5/5/2017.
 */
// import {Response, Request} from "@types/express"
import {Response, Request} from "express"
import {AController} from "../interfaces/AController";

import {models} from "../../models";

import misc from "../../libs/misc";

class Login extends AController {
    async create(req: Request, res: Response) {
        try {

            let {username, password} = req.body;

            let user = await models.User.findOne({
                where: {
                    username: username
                }
            });

            if (!user) {
                return res.send({
                    success: false,
                    message: 'User not found'
                });
            }

            if (misc.sha1(password) != user.password) {
                return res.send({
                    success: false,
                    message: 'Wrong password'
                });
            }

            let j_user = user.toJSON();
            delete j_user.password;

            (req as any).session.account = j_user;

            res.send({
                success: true,
                data: j_user
            })

        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            delete req.session.account;
            res.send({
                success:true
            })
        }
        catch(e){
            res.status(500).send(e);
        }
    }


}

module.exports = new Login();