const Agent = require("../models/agents");
const { CrudRepository } = require("./crud-repository");

class AgentRepository extends CrudRepository{
  constructor(){
    super(Agent);
  }

  async findByNumber({ number }) {
        try {
          // console.log("email = "+email);
          // console.log('number = ' + number);
          const user = await Agent.findOne({ number });
          // console.log("result = "+user);
          return user;
        } catch (error) {
          console.log('Something went wrong in the repository layer ', error);
          throw { error };
        }
      }
}

module.exports = AgentRepository;