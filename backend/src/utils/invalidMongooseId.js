import mongoose from "mongoose";

const invalidMongooseId = (id) => {
    return !mongoose.isValidObjectId(id);
};

export default invalidMongooseId;