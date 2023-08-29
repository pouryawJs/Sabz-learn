const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
})();

app.listen(port, () => {
    console.log(`listening to ${port}`);
});
