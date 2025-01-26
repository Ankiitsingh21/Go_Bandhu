const AgentRepository = require('../repositories/agent-repository');
const { CrudRepository } = require('../repositories/crud-repository');

class AgentService extends CrudRepository {
  constructor() {
    const agentRepository = new AgentRepository();
    super(agentRepository);
    this.agentRepository = new AgentRepository();
  }

  async signIn(data) {
    try {
      // console.log("In the agent service layer "+data.number);
      const number = data.number;
      const agent = await this.agentRepository.findByNumber({ number });
      if (!agent) {
        throw new Error('No agent found');
      }
      // if (agent.roles == 'Admin') {
      //   console.log('This agent is Admin');
      // }
      // if (!agent.comparePassword(data.password)) {
      //   throw new Error('Incorrect password');
      // }
      const token = agent.genJWT();
      // console.log(token);
      return token;
    } catch (error) {
      console.log('Something went wrong in the Service Layer');
      throw error;
    }
  }

  async findByIdAndUpdate(id, data) {
    try {
      const response = await this.agentRepository.findByIdAndUpdate(id, data);
      return response;
    } catch (error) {
      console.log('Something went wrong in the Service Layer');
      throw error;
    }
  }

  async getAllAgents() {
    try {
      // Fetch all agents from the repository
      const agents = await this.agentRepository.findAllAgents();
      return agents;
    } catch (error) {
      throw new Error('Error fetching agents');
    }
  }
}

module.exports = AgentService;
