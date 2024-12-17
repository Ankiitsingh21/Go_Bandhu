const {UserRepository} = require('../repository/user-repository');

class UserService{
        constructor(){
               this.userRepository = new UserRepository();
        }

        async signUp(data){
                try {
                        const user = await this.userRepository.create(data);
                        // console.log(user);
                        return user;
                } catch (error) {
                        console.log("Something went wrong in the Service Layer");
                        console.log(error);
                        throw error;
                }
        }

        async getUserByemail(email) {
                try {
                    const user = await this.userRepository.findByEmail({ email });
                    return user;
                } catch (error) {
                    console.log("Something went wrong on the service Layer", error);
                    throw error; // Rethrow error to handle it at a higher level
                }
        }
            

        async signIn(data){
                try {
                        const user= await this.getUserByemail(data.email);
                        if(!user){
                        throw{
                                 message:"no user found",
                                 success: false,
                            };
                        }
                        if(user.roles=="Admin"){
                                console.log("This user is Admin");
                        }
                        if(!user.comparePassword(data.password)){
                         throw{
                                 message:"Incorrect password",
                                 success: false,
                         }
                        }
                        const token = user.genJWT();
                        return token;
                } catch (error) {
                        console.log("Something went wrong in the Service Layer");
                        console.log(error);
                }
        }
}

module.exports= UserService