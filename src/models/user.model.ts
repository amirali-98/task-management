import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface UserInterface {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
}

const userSchema = new Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'This email is already exist'],
      trim: true,
      validate: [validator.isEmail, 'Email must be valid.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minLength: [8, 'Password must have at least 8 characters.'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password confirm is required.'],
      validate: {
        validator: function (this: any, val) {
          return this.password === val;
        },
        message: 'Password and password confirm must be same.',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserInterface>('User', userSchema);
