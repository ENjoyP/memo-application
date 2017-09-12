import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Memo = new Schema({
    writer : String,
    contents : String,
    starred : [String],
    isEdited : { type : Boolean, default : false },
    date : {
        created : { type : Date, default : Date.now },
        edited : { type : Date, default : Date.now }
    }
});

export default mongoose.model('memo', Memo);