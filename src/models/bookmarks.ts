/// <reference path='../../typings/index.d.ts' />
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, default: 'No Category', required: true },
  createdAt: { type: Date, default: Date, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});
const Bookmarks = mongoose.model('Bookmark', BookmarkSchema);

export default Bookmarks;
export interface IBookmark {
  name: string,
    url: string,
    category: string,
    createdAt: Date,
    creator: mongoose.Schema.Types.ObjectId,
    __v: number,
    _id: string,
}
