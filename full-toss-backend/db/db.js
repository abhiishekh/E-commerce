import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const product = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    mrp:{type:Number, required:true},
    stocks:{type:Number, required:true},
    imageUrl:{type:String,default:"https://imgs.search.brave.com/76c06r7iWSI80kcIJbaIkSnZy-KIJCFpH1XhpzWjO_A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/NC9JUEwtTG9nby0y/MDE3LVBORy5wbmc"},

})
const user = new Schema({
    username:{type:String, required:true,unique:true},
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    phone:{type:String, required:true},
    iplTeam:{type:String, required:true},
    address:[{type:String,}],
    items:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
})

const ProductModule = mongoose.model('products',product)
const UserModule = mongoose.model("users",user)

export {
     UserModule,
     ProductModule,
     
    }