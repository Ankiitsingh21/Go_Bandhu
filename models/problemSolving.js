const mongoose = require('mongoose');

const problemSolvingSchema = new mongoose.Schema({
        QueryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Query',
            required:true
        },
        AgentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Agent',
            required:true
        },
        status:{
            type:String,
            enum:['accepted','rejected','Ignored'],
            default:'Ignored'
        }
},{timestamps:true});

const ProblemSolving = mongoose.model('ProblemSolving',problemSolvingSchema);

module.exports = ProblemSolving;