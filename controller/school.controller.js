import Joi from "joi";
import db from "../utils/db_config.js";
import { errorHandler } from "../utils/error.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { calculateDistance } from "../utils/calculateDistance.js";

const schema = Joi.object({
  name: Joi.string().min(4).max(100).required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

export const addSchool = async (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(errorHandler(400, { message: error.details[0].message }));
  }

  const { name, address, latitude, longitude } = value;

  try {
    const sqlQuery =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES(?,?,?,?)";
    const [result] = await db.query(sqlQuery, [
      name,
      address,
      latitude,
      longitude,
    ]);
    if(result.affectedRows === 0){
      return next(errorHandler(409,{message:"Failed to add school"}));
    }
   
    res
      .status(201)
      .send(new ApiResponse(201, "School added successfully", {id:result[0].insertId}));
  } catch (error) {
    console.error("Error adding school:", error);
    next(errorHandler(500, { message: error }));
  }
};


export const listSchools = async(req,res,next) => {
    const {latitude,longitude} = req.query;
    if(!latitude || !longitude){
        return next(errorHandler(400,{message:"Latitude and Longitude are required"}));
    }

    try {
        const [schools] = await db.query(`SELECT * FROM schools`);
        if(schools.length === 0){
            return next(errorHandler(404,{message:"No school found"}));
        }

        const sortedSchools =schools.map(school => ({
            ...school,
            distance:calculateDistance(
                latitude,
                longitude,
                school.latitude,
                school.longitude
            )

        })).sort((a,b) => a.distance - b.distance);

        res.send(new ApiResponse(200, "Schools retrieved successfully", sortedSchools));
    } catch (error) {
        console.error("Error retrieving schools:", error);
        next(errorHandler(500, { message: "Internal Server Error" }));
    }
}