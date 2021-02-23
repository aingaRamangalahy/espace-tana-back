const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Veuillez ajouter un commentaire!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Veuillez noter l'espace!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  espace: {
    type: mongoose.Schema.ObjectId,
    ref: "Espace",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// prevent user from submitting more than one review par espace
ReviewSchema.index({ espace: 1, user: 1 }, { unique: true });

// Static methode to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (espaceId) {
  const obj = await this.aggregate([
    { $match: { espace: espaceId } },
    {
      $group: {
        _id: "$espace",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
      await this.model("Espace").findByIdAndUpdate(espaceId, {
          averageRating: obj[0].averageRating
      })
  } catch (error) {
      console.error(error)
  }
};

//call getAverageRating after save the review
ReviewSchema.post("save", function(){
    this.constructor.getAverageRating(this.bootcamp)
})
