import Test from "../models/test.model.js";

// post route

export const createTest = async (req, res) => {
  try {

    const { name, image } = req.body;

    if (!name && !image) {
      console.log("req fields are misssing...");
    }

    const test = await Test.create({
      name,
      image: req.file.filename
    });

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get test

export const getTest = async (req, res) => {

  try {

    const test = Test.find();

    res.status(200).json({
      test,
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}