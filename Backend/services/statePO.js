import pool from "../config/postgres.js";

const StatePO=async (req,res,next)=>{
    try{
        const result= await pool.query(`SELECT DISTINCT "StateName" FROM "Post_Offices";`);
        return res.status(200).json({
            message:"Your Data is ready",
            result:result.rows,
        });
    }catch (err){
        console.log(err);
    }
}
export { StatePO };