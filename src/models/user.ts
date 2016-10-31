/// <reference path='../../typings/index.d.ts' />
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean
});
UserSchema.pre('save', function(next) {
  let currentUser = this;

  if (!currentUser.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(currentUser.password, salt, (err, hash) => {
      if (err) { return next(err); }
      currentUser.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};
const Users = mongoose.model('User', UserSchema);
export default Users;

export interface IUser {
  name: string,
    password: string,
    admin: boolean
}
