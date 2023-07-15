const mongoose = require("mongoose");

const connectDatabase = () => {
  const url = process.env.DB_URL;
  mongoose.connect(url).then((con) => {
    console.log(`mongodb databse connected with Host:${con.connection.host} `);
  });
};

module.exports = connectDatabase;
