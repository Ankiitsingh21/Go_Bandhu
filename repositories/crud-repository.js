class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw { error };
    }
  }

  async update(id, data) {
    // console.log('this.model:', this.model);
    if (!id || !data) {
      throw new Error('ID and data are required for updating the query.');
    }
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw { error };
    }
  }

  async findByEmail({ email }) {
    try {
      // console.log("email = "+email);
      const user = await this.model.findOne({ email });
      // console.log("result = "+user);
      return user;
    } catch (error) {
      console.log('Something went wrong in the repository layer ', error);
      throw { error };
    }
  }

  async findByNumber({ number }) {
    try {
      // console.log("email = "+email);
      // console.log('number = ' + number);
      const user = await this.model.findOne({ number });
      // console.log("result = "+user);
      return user;
    } catch (error) {
      console.log('Something went wrong in the repository layer ', error);
      throw { error };
    }
  }

  async getAll(filters = {}) {
    try {
      console.log('Using model in getAll:', this.model);
      const result = await this.model.find(filters);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw { error };
    }
  }

  async findById(id) {
    try {
      console.log(id);
      const result = await this.model.find(id);
      // console.log(result);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      console.log(error);
      throw { error };
    }
  }
}

module.exports = {
  CrudRepository,
};
