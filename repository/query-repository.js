const Query = require('../models/query');
const { CrudRepository } = require('./crud-repository');

class QueryRepository extends CrudRepository {
  constructor() {
    super(Query);
  }
}

module.exports = {
  QueryRepository,
};
