const Document = require('../models/document');
const { CrudRepository } = require('./crud-repository');

class DocumentRepository extends CrudRepository {
  constructor() {
    super(Document);
  }

  async findByDocumentId(id) {
    try {
      // console.log(id);
      const result = await this.model.findOne({ _id: id });
      // console.log(result);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      console.log(error);
      throw { error };
    }
  }
}

module.exports = DocumentRepository;
