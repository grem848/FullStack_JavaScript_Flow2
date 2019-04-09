var mongoose = require('mongoose')
var mongoDB = "connection string classdemo1";
/*
  Insert your connection string to your Cloud based Mongo DB on Atlas below.
  Remember to insert you own userName, Password and name of DB (instead of the suggested /test)
*/
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true })
  .then((con) => console.log("You are now connected to Mongo!"))
  .catch(err => console.log("Something went wrong: " + err));

setTimeout(() => {
  mongoose.disconnect(() => console.log("Disconnected"));
}, 3000);

var userSchema = new mongoose.Schema({
  userName: String,
  email: { type: String, unique: true },
  modified: { type: Date, default: Date.now }
});
// Build the User model
var User = mongoose.model('User', userSchema);

async function addUser(userName, email) {
  var user = new User({ userName, email })
  await user.save();
}

async function findUser(fields, projection) {
  // return await User.find({userName: /Wonnegut/i}, {userName: 1});
  return await User.find({ userName: /Wonnegut/i }, { userName: 1, _id: 0 })
    .sort({ userName: 0 })
    .collation({ locale: "da" }) // capital and small letters
    .limit(6)
  // return User.find(fields, projection);
}

async function editUser() {
  var user = await User.findOneAndUpdate(
    {userName: "testuser1"},
    {email: "coolmail@gmail.com"},
    {new: true} // returns updated user, otherwise original is returned
  );
  console.log(user);
}

async function deleteUser(){
  await User.findOneAndDelete({userName: "testuser3"});
  var user = await User.findOne({userName: "testuser3"});
  console.log("Status:", user === null) // true = good
}

async function testFindUser() {
  try {
    var users = await findUser("ddd", "ddd");
    console.log(users);
  } catch (error) {
    console.log("ERROR IN testFindUser!: " + error)
  }
}

async function testAddUser() {
  try {
    await User.deleteMany({});
    await addUser("testuser1", "test1@b.dk");
    await addUser("testuser2", "test2@b.dk");
    await addUser("testuser3", "test3@b.dk");
    await addUser("testuser4", "test4@b.dk");
    await addUser("Kurt Wonnegut", "kw@b.dk");
    await addUser("Hanne Wonnegut", "hw@b.dk");
    await addUser("Ib Wonnegut", "iw@b.dk");
    console.log("Test Users added");

  } catch (error) {
    console.log("ERROR IN testAddUser!: " + error)
  }


}
//testAddUser();
//testFindUser();
// editUser();
deleteUser();
