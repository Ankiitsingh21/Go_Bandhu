class CrudService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    try {
      // console.log("in the seervice layer "+data);
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      console.log('something went wrong on Crud service layer');
      throw { error };
    }
  }

  async destroy(id) {
    try {
      const response = await this.repository.destroy(id);
      return response;
    } catch (error) {
      console.log('something went wrong on Crud service layer');
      throw { error };
    }
  }

  async getById(id) {
    try {
      // console.log(id);
      const response = await this.repository.findById(id);
      return response;
    } catch (error) {
      console.log('something went wrong on Crud service layer');
      throw { error };
    }
  }

  async getAll({}) {
    try {
      const response = await this.repository.getAll({});
      return response;
    } catch (error) {
      console.log('something went wrong on Crud service layer');
      throw { error };
    }
  }

  async update(id, data) {
    try {
      const response = await this.repository.update(id, data);
      return response;
    } catch (error) {
      console.log('something went wrong on Crud service layer');
      throw { error };
    }
  }
}

module.exports = CrudService;
