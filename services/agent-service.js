const AgentRepository = require('../repository/agent-repository');
const { CrudRepository } = require('../repository/crud-repository');

class AgentService extends CrudRepository{
        constructor(){
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
}

module.exports = AgentService;

