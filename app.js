const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');


app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://meghanand1234:GwtQm0EgyoZYBLui@cluster0.tp28rkh.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = {
    name: String
};


const Item = mongoose.model("Item" , itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
})


const item2 =  new Item({
    name : "Hit the + button to add a new item."
})

const item3 = new Item({
    name : "<-- Hit this to delete an item."
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var defaultItems = [item1, item2, item3];


const ListSchema= {
    name : String,
    items : [itemsSchema]
};


const List = mongoose.model("List" , ListSchema);

var item = "";

app.get('/', (req, res) => {

    
    var today = new Date();

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var day = today.toLocaleDateString("en-US", options);


    
    Item.find({})
    .then( (foundItems)=>{

        if( foundItems.length === 0){
            Item.insertMany(defaultItems)
 .then(() => {
    console.log("Successfully saved items to DB");
})
.catch((err) => {
    console.log(err);
});
res.redirect("/"); }else{

        console.log(foundItems);
        res.render('list', { typeOfDay: day , newListItem: foundItems});
}
    })
    .catch((err) => {console.log(err)}
    );
    
}  );


app.post("/" , (req, res) => {
   const itemName = req.body.newItem;
    const item = new Item({
        name : itemName
    });
    item.save();
    res.redirect("/");  
});


app.post("/delete" , (req, res) => {
    console.log(req.body.checkbox);

    const item = req.body.checkbox;
    Item.deleteOne({_id :item} )
    .then(() => { console.log("Item Removed")})
    .catch((err) => {console.log(err)});

    res.redirect("/");

});


app.post("/delete", (req, res) => {
    let item = req.body.itemId;
    let listName = req.body.customListTitle;
    console.log(listName);
    console.log(item);
    for (let i = 0; i < items.length; i++) {
        if (items[i] == listName) {
            console.log(true);
        }
    }
    res.redirect("/");
});
app.listen(4000, () => {
    console.log(__dirname);
    console.log('Example app listening on port 3000!');
});