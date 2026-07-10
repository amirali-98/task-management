import { HydratedDocument, Model, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface UserInterface {
  firstName: string;
  lastName?: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  passwordChangedAt: Date | undefined;
}

interface UserMethods {
  comparePassword(textPassword: string): Promise<boolean>;
  isPasswordChangedAfterTokenSet(iat: number): boolean;
}

type UserModel = Model<UserInterface, {}, UserMethods>;
type UserDocument = HydratedDocument<UserInterface, UserMethods>;

const userSchema = new Schema<UserInterface, UserModel, UserMethods>(
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
      select: false,
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
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 14);
    this.passwordConfirm = undefined;
  }
});

userSchema.methods.comparePassword = async function (
  this: UserDocument,
  textPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(textPassword, this.password!);
};

userSchema.methods.isPasswordChangedAfterTokenSet = function (
  this: UserDocument,
  iat,
) {
  if (this.passwordChangedAt) {
    return iat * 1000 < new Date(this.passwordChangedAt).getTime();
  }

  return false;
};

export const User = model<UserInterface, UserModel>('User', userSchema);
