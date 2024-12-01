import pool from "../config/postgres.js";

const locatepostoffice=async (req,res,next)=>{
    const State=req.body.State;
    const District=req.body.District;
    const Pincode=req.body.Pincode;
    console.log(Pincode);
    if ((!State || !District) && !Pincode) {
        return res.status(400).json({ error: "All fields are required." });
      }console.log("1");
    try{
        const result= await pool.query(`
      SELECT * FROM "Post_Offices"
      WHERE 
        ($3::integer IS NOT NULL AND "Pincode" = $3::integer)
        OR 
        (($2::text IS NOT NULL OR $1::text IS NOT NULL)
          AND (
            "District" ILIKE $2::text OR "StateName" ILIKE $1::text
          ));
    `,[State || null,District || null,Pincode || null]);
        return res.status(200).json({
            message:"Your Data is ready",
            result:result.rows,
        });
    }catch (err){
        console.log(err);
    }
}
export { locatepostoffice };