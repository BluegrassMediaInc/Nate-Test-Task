const Client = require("../models/client.model");
const Item = require("../models/item.model");

const db = require("../models");
const { onSuccess, onError } = require("../utils/apiresponse");
const { dbDate, validateEmail } = require("../utils/validation");

const { sequelize } = db;

/*
 * Please look at swagger api documentation
 * '/api-docs/#/default/post_client_create'
 * for more detail on request and response
 */
const create = (req, res) => {
  const { name, email, budget } = req.body;
  if (!name) {
    onError(res, { message: "name can not be empty!" }, "PRO03", false, 200);
    return;
  }
  if (!email) {
    onError(res, { message: "email can not be empty!" }, "PRO03", false, 200);
    return;
  }
  if (email && validateEmail(email)) {
    onError(res, { message: "email is invalid!" }, "PRO03", false, 200);
    return;
  }
  sequelize
    .transaction()
    .then((t) => {
      Client.create({ name, email }, { transaction: t })
        .then((data) => {
          let newB = [];
          budget.forEach((b) => {
            newB.push({
              client_id: data.id,
              description: b.description,
              cost: b.cost,
            });
          });
          if (newB.length > 0) {
            Item.bulkCreate(newB, { transaction: t })
              .then(() => {
                t.commit();
                onSuccess(res, { added: true });
              })
              .catch((err) => {
                t.rollback();
                onError(res, err, "", true);
              });
          } else {
            t.commit();
            onSuccess(res, { added: true });
          }
        })
        .catch((err) => {
          t.rollback();
          onError(res, err, "", true);
        });
    })
    .catch((err) => {
      console.log(err);
      onError(res, err, "", true);
    });
};

/*
 * Please look at swagger api documentation
 * '/api-docs/#/default/post_client_update_'
 * for more detail on request and response
 */
const update = (req, res) => {
  const { id } = req.params;
  const { name, email, budget } = req.body;
  if (!id) {
    onError(res, { message: "id can not be empty!" }, "PRO03", false, 200);
    return;
  }
  if (!name) {
    onError(res, { message: "name can not be empty!" }, "PRO03", false, 200);
    return;
  }
  if (!email) {
    onError(res, { message: "email can not be empty!" }, "PRO03", false, 200);
    return;
  }
  if (email && validateEmail(email)) {
    onError(res, { message: "email is invalid!" }, "PRO03", false, 200);
    return;
  }
  Client.findOne({
    where: { id: id, deletedAt: null },
  }).then((data) => {
    if (!data) {
      onError(res, { message: "client does not exist." }, "PRO14", true, 200);
    } else {
      Client.update({ name, email }, { where: { id: id } })
        .then(() => {
          console.log(id);
          let newB = [];
          budget.forEach((b) => {
            console.log(b);
            if (b.id === 0) {
              newB.push({
                client_id: id,
                description: b.description,
                cost: b.cost,
              });
            } else if (b.delete) {
              console.log("delete", b.id);
              Item.update(
                { deletedAt: dbDate() },
                { where: { id: b.id } }
              ).then(() => {});
            } else {
              console.log("update", b.id);
              Item.findOne({
                where: { id: b.id, deletedAt: null },
              }).then((data1) => {
                if (!data1) {
                  newB.push({
                    client_id: id,
                    description: b.description,
                    cost: b.cost,
                  });
                } else {
                  Item.update(
                    {
                      client_id: id,
                      description: b.description,
                      cost: b.cost,
                    },
                    { where: { id: b.id } }
                  ).then(() => {});
                }
              });
            }
          });
          if (newB.length > 0) {
            Item.bulkCreate(newB)
              .then(() => {
                console.log("create");
                onSuccess(res, { updated: true });
              })
              .catch((err) => {
                onError(res, err, "", true);
              });
          } else {
            console.log("last");
            onSuccess(res, { updated: true });
          }
        })
        .catch((err) => {
          onError(res, err, "", true);
        });
    }
  });
};

/*
 * Please look at swagger api documentation
 * '/api-docs/#/default/post_client_remove_'
 * for more detail on request and response
 */
const remove = (req, res) => {
  const { id } = req.params;
  if (!id) {
    onError(res, { message: "id can not be empty!" }, "PRO03", false, 200);
    return;
  }

  Client.findOne({
    where: { id, deletedAt: null },
  }).then((data) => {
    if (!data) {
      onError(res, { message: "client does not exist." }, "PRO14", true, 200);
    } else {
      sequelize
        .transaction()
        .then((t) => {
          Client.update({ deletedAt: dbDate() }, { where: { id } })
            .then(() => {
              t.commit();
              onSuccess(res, { deleted: true });
            })
            .catch((err) => {
              t.rollback();
              onError(res, err, "", true);
            });
        })
        .catch((err) => {
          onError(res, err, "", true);
        });
    }
  });
};

/*
 * Please look at swagger api documentation
 * '/api-docs/#/default/get_client_getAll_'
 * for more detail on request and response
 */
const getAll = (req, res) => {
  let { limit, offset } = req.query;

  if (!limit) {
    onError(res, { message: "limit can not be empty!" }, "PRO03", false, 200);
    return;
  }

  if (!offset) {
    onError(res, { message: "offset can not be empty!" }, "PRO03", false, 200);
    return;
  }

  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);

  if (!Number.isInteger(offset)) {
    onError(res, { message: "offset should be integer!" }, "PRO04", false, 200);
    return;
  }

  if (!Number.isInteger(limit)) {
    onError(res, { message: "limit should be integer!" }, "PRO04", false, 200);
    return;
  }
  Client.findAll({
    attributes: ["id", "name", "email", "created_at", "updated_at"],
    where: { deletedAt: null },
    order: [["id", "DESC"]],
    include: [
      {
        model: Item,
        attributes: [
          "id",
          "client_id",
          "description",
          "cost",
          "created_at",
          "updated_at",
        ],
        where: { deletedAt: null },
        required: false,
      },
    ],
    offset,
    limit,
  }).then((data) => {
    if (!data) {
      onError(res, { message: "client does not exist." }, "PRO14", true, 200);
    } else {
      if (data) {
        let isMore;
        if (data.length < limit) {
          isMore = false;
        } else {
          isMore = true;
        }
        onSuccess(res, { items: data, isMore });
      } else {
        onSuccess(res, { items: [], isMore: false });
      }
    }
  });
};

/*
 * Please look at swagger api documentation
 * '/api-docs/#/default/get_client_get'
 * for more detail on request and response
 */
const get = (req, res) => {
  const { id } = req.params;

  if (!id) {
    onError(res, { message: "id can not be empty!" }, "PRO03", false, 200);
    return;
  }

  Client.findOne({
    attributes: ["id", "name", "email", "created_at", "updated_at"],
    where: { id, deletedAt: null },
    include: [
      {
        model: Item,
        attributes: [
          "id",
          "client_id",
          "description",
          "cost",
          "created_at",
          "updated_at",
        ],
        where: { deletedAt: null },
        required: false,
      },
    ],
  }).then((data) => {
    if (!data) {
      onError(res, { message: "client does not exist." }, "PRO14", true, 200);
    } else {
      onSuccess(res, data);
    }
  });
};

module.exports = {
  create,
  remove,
  getAll,
  update,
  get,
};
