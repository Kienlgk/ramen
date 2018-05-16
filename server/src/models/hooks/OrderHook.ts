// import { OrderInstance } from '../order';

export = function(models, eventEmitter) {
    var OrderModel = models.Order;
    var TableModel = models.Table;
    OrderModel.afterCreate(async (order, options) => {
        eventEmitter.emit('Order:afterCreate', order);
        let obj = order.toJSON();
        let table = await TableModel.findByPrimary(obj.table_id);
        if (table) {
          await table.update({
            currentOrder: obj.id,
            status: 'Using'
          });
        }
    });

    OrderModel.afterUpdate(async (order, options) => {
        eventEmitter.emit('Order:afterUpdate', order);
        let obj = order.toJSON();
        let table = await TableModel.findByPrimary(obj.table_id);
        if (table && (obj.status == 'Completed' || obj.status == 'Cancelled')) {
          await table.update({
            currentOrder: obj.id,
            status: 'Available'
          });
        }
    });
}
