import models from '../models';

function find(where, res, next) {
  models.Food.findAll({
    where,
    include: [
      {
        model: models.Restaurant,
        as: 'restaurant',
      },
      {
        model: models.Category,
        as: 'category',
      },
      {
        model: models.Type,
        as: 'type',
      },
    ],
  })
    .then((food) => next(food))
    .catch((err) => res.status(501).json(err));
}

function execute(promise, res) {
  promise.then(() => res.send(200))
    .catch((err) => res.status(501).json({ err }));
}

export default {
  get(req, res) {
    find({ id: req.params.id }, res, ([data]) => {
      res.status(200).json(data);
    });
  },
  getAll(req, res) {
    const where = {};
    if (Object.keys(req.query).length) {
      Object.keys(req.query).forEach((key) => {
        where[key] = req.query[key];
      });
    }
    find(where, res, (data) => {
      res.status(200).json(data);
    });
  },
  create: (req, res) => execute(
    models.Food.create(req.food), res,
  ),
  update: (req, res) => execute(
    models.Food.update(req.food, { where: { id: req.params.id } }), res,
  ),
  delete: (req, res) => execute(
    models.Food.destroy({ where: { id: req.params.id } }), res,
  ),
};
