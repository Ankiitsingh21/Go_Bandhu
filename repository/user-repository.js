const User = require('../models/user.js');

class UserRepository{
        async create(data){
                try {
                        const user = await User.create(data);
                        return user;
                } catch (error) {
                        console.log("Something went wrong in the repository layer");
                        console.log(error);
                        return error;
                }
        }

        async findByEmail({ email }) {
                try {
                    const user = await User.findOne({ email });
                //     console.log(user);
                    return user;
                } catch (error) {
                    console.log("Something went wrong in the repository layer", error);
                    throw error; // Rethrow error for better debugging
                }
        }
            
}
module.exports={
        UserRepository
}