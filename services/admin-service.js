const AdminRepository = require('../repositories/admin-repository');
const CrudService = require('./crud-service');

class AdminService extends CrudService {
  constructor() {
    const adminRepository = new AdminRepository();
    super(adminRepository);
    this.adminRepository = new AdminRepository();
  }

  async signIn(data) {
    try {
      // console.log("In the admin service layer "+data.number);
      const number = data.number;
      const admin = await this.adminRepository.findByNumber({ number });
      if (!admin) {
        throw new Error('No admin found');
      }
      // if (admin.roles == 'Admin') {
      //   console.log('This admin is Admin');
      // }
      // if (!admin.comparePassword(data.password)) {
      //   throw new Error('Incorrect password');
      // }
      const token = admin.genJWT();
      // console.log(token);
      return token;
    } catch (error) {
      console.log('Something went wrong in the Service Layer');
      throw error;
    }
  }
}

module.exports = AdminService;
