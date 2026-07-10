import { Schema, Types, HydratedDocument, model } from 'mongoose';
import slugify from 'slugify';
import { User, UserInterface } from './user.model';

export interface TaskInterface {
  title: string;
  description?: string;
  isCompleted: boolean;
  isDeleted: boolean;
  slug: string;
  user: Types.ObjectId | UserInterface;
}

type TaskDocument = HydratedDocument<TaskInterface>;

const taskSchema = new Schema<TaskInterface>(
  {
    title: {
      type: String,
      required: [true, 'Document must have a title'],
      trim: true,
    },
    description: {
      type: String,
      tirm: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    slug: String,
    user: {
      type: Schema.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.pre('save', function (this: TaskDocument) {
  this.slug = slugify(this.title, { lower: true });
});

export const Task = model<TaskInterface>('Task', taskSchema);
