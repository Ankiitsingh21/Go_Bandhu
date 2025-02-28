const Agent = require('../models/agents');
const { CrudRepository } = require('./crud-repository');

class AgentRepository extends CrudRepository {
  constructor() {
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

  async findByIdAndUpdate(id, data) {
    try {
      const result = await Agent.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw { error };
    }
  }

  async createe(data) {
    try {
      // console.log(data);
      const result = await Agent.create(data);
      // console.log(result);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');

      if (error.code === 11000) {
        const key = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[key];
        // console.log('Key:', key + ' Value:', value);
        const existingUser = await Agent.findOne({ [key]: value });
        // console.log(existingUser);
        if (existingUser && key === 'number' && !existingUser.numberVerified) {
          // const token = existingUser.genJWT();
          throw {
            error: 'Agent already exists, but the number is not verified.',
            existingUser,
            // token,
          };
        } else {
          throw {
            error: `Duplicate key error: ${key} already exists.`,
            existingUser,
          };
        }
      } else {
        throw { error };
      }
    }
  }

  async findByAgentId(agentId) {
    try {
      // const response = await Profile.findOne({userId});
      // console.log("hiii heloo   "+response);
      return await Agent.find({ agentId });
    } catch (error) {
      console.log('Something went wrong in Query Repository', error);
      throw error;
    }
  }

  async findAllAgents() {
    try {
      return await Agent.find().exec();
    } catch (error) {
      throw new Error('Error fetching agents from database');
    }
  }
}

module.exports = AgentRepository;
