const Admin = require('../models/admin');
const { CrudRepository } = require('./crud-repository');

class AdminRepository extends CrudRepository {
  constructor() {
    super(Admin);
  }
}

module.exports = AdminRepository;
