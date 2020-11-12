const mongoose = require("mongoose");

const EspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez ajouter le nom de l'espace"],
    unique: true,
    maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"],
  },

  slug: String,

  description: {
    type: String,
    required: [true, "Veuillez ajouter une description"],
    maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
  },

  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Veuillez ajouter un URL valide avec HTTP or HTTPS",
    ],
    required: false,
  },

  phone: {
    type: String,
    maxlength: [20, "veuillez ajouter un numéro de téléphone valide"],
    required: true,
  },

  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Veuillez ajouter une adresse email valide",
    ],
    required: false,
  },

  address: {
    type: String,
    required: [true, "Veuillez ajouter l'adresse de votre espace"],
  },

  location: {
    //GeoJson Point
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },

  averageRating: {
    type: Number,
    min: [1, "La note minimale valide est 1"],
    max: [10, "La note maximale valide est 10"],
  },

  photo: {
    type: String,
    default: "no-photo.jpg",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  indoor: {
    type: Boolean,
    default: true,
    area: {
      type: String,
    },
  },

  outdoor: {
    type: Boolean,
    default: true,
    area: {
      type: String,
    },
  },

  includeCateringService: {
    type: Boolean,
    default: false,
  },

  includeAnimationsService: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Espace", EspaceSchema);