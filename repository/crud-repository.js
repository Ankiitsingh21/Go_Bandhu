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

  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw { error };
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findOneAndUpdate(
        { _id: id }, 
        data, 
        { new: true }
      );      
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

  async getAll(id) {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      throw { error };
    }
  }

  async findById(id) {
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

module.exports = {
  CrudRepository,
};
