import pool from "../config/postgres.js";

const DistrictPO=async (req,res,next)=>{
    const State=req.body.State;
    if (!State ) {
        return res.status(400).json({ error: "All fields are required." });
      }
    try{
        const result= await pool.query(`
            SELECT DISTINCT "District"
            FROM "Post_Offices"
            WHERE "StateName" = $1;
            `,[State]);
        return res.status(200).json({
            message:"Your Data is ready",
            result:result.rows,
        });
    }catch (err){
        console.log(err);
    }
}
export { DistrictPO };