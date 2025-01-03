const ProblemSolvingRepository = require('../repositories/problemSolving-repository');
const CrudService = require('./crud-service');

class ProblemSolvingService extends CrudService {
  constructor() {
    const problemSolvingRepository = new ProblemSolvingRepository();
    super(problemSolvingRepository);
  }
}

module.exports = ProblemSolvingService;