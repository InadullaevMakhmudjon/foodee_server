import models from '../models';

function find(where, res, next) {
  models.Restaurant.findAll({ where })
    .then((data) => next(data))
    .catch((err) => res.status(501).json({ err }));
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
  getAll(_, res) {
    find(null, res, (data) => {
      res.status(200).json(data);
    });
  },
  create: (req, res) => execute(
    models.Restaurant.create(req.restaurant), res,
  ),
  update: (req, res) => execute(
    models.Restaurant.update(req.restaurant, { where: { id: req.params.id } }), res,
  ),
  delete: (req, res) => execute(
    models.Restaurant.destroy({ where: { id: req.params.id } }), res,
  ),
};
