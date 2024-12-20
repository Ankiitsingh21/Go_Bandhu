const DocumentRepository = require('../repository/document-repository');
const CrudService = require('./crud-service');

class DocumentService extends CrudService {
  constructor() {
    const documentRepository = new DocumentRepository();
    super(documentRepository);
  }
}

module.exports = DocumentService;
