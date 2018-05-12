const schema = mongoose.Schema;

const UserSchema = new schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  
  password: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('User', UserSchema);
