const mongoose = require("mongoose");
const customerHighlightSchema = new mongoose.Schema(
   {
    ch_id:String,
    ch_highlight:[
        {
         title:String,
         description:String,
         image:String
        }
    ]
},
{
    timestamps:true
}
);

module.exports = mongoose.model("CustomerHighlight", customerHighlightSchema);