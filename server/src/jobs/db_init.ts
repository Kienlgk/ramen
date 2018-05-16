import {models, sequelize} from "../models";

module.exports = function () {
    sequelize.sync().then(async (rs) => {
        let admin = await rs.model('User').findOne({
            where: {
                username: 'admin'
            }
        })
        if(admin) {
          console.log('admin is already created')
        } else {
          rs.queryInterface.bulkInsert('Users', [{
              username: 'admin',
              password: 'd033e22ae348aeb5660fc2140aec35850c4da997',
              isAdmin: true,
              created_at: new Date(),
              updated_at: new Date()
          }], {});
        }
        console.log("Sync database successful");
    }).catch((e) => {
        console.log("Sync database failed: ", e.message);
    });
};
