

class userModel{
    constructor(id,name,email,password){
        this.id=id
        this.name=name;
        this.email=email;
        this.password=password
    }

    static add(name,email,password){
        const NewUser = new userModel(Users.length+1,name,email,password)
        Users.push(NewUser)
        console.log(NewUser)
    }

    static isValidUser(email,password){
        const userFound = Users.find(user=>user.email==email && user.password==password )
        console.log(userFound)
        return userFound;
    }
}

let Users = [];

module.exports = userModel
