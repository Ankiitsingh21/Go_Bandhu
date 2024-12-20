const Document = require('../models/document');
const { CrudRepository } = require('./crud-repository');

class DocumentRepository extends CrudRepository {
  constructor() {
    super(Document);
  }
}

module.exports = DocumentRepository;
