const ProblemSolving = require('../models/problemSolving');
const { CrudRepository } = require('./crud-repository');

class ProblemSolvingRepository extends CrudRepository {
  constructor() {
    super(ProblemSolving);
  }
}

module.exports = ProblemSolvingRepository;
