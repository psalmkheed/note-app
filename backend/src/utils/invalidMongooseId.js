import mongoose from "mongoose";
export default function invalidMongooseId(res, id) {

      if(!mongoose.isValidObjectId(id)){
             res.status(400).json({
                  success: false,
                  message: "invalid note id"
            })
            return true;
      }
      return false;

}
