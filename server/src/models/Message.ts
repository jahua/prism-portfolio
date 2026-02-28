import { Schema, model, Document } from 'mongoose'

export interface IMessage extends Document {
  name: string
  email: string
  message: string
  read: boolean
  createdAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Message = model<IMessage>('Message', messageSchema)
