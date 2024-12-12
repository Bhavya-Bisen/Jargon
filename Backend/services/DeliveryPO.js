import pool from "../config/postgres.js";

const DeliveryPO=async (req,res,next)=>{
    const Pincode=req.body.Pincode
    if (!Pincode ) {
        return res.status(400).json({ error: "All fields are required." });
      }
    try{
        const avg_dy_td=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Days"  -- Convert seconds to days
        FROM "Delivery_Data" 
        WHERE ("Source_PostOffice" = $1);
`,[Pincode]);
        const on_tr_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER 
        (WHERE "Citizen_Charter_Compliance" = TRUE) * 100.0 / COUNT(*) AS "On_Time_Delivery_Rate_Percentage"
        FROM "Delivery_Data"
        WHERE ("Source_PostOffice" = $1);
`,[Pincode]);
        const delayed_no_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER (WHERE "Citizen_Charter_Compliance" = FALSE) AS "Delayed_Deliveries_Count"
        FROM "Delivery_Data"
        WHERE ("Source_PostOffice" = $1);
`,[Pincode]);
        const delayed_per_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER (WHERE "Citizen_Charter_Compliance" = FALSE) * 100.0 / COUNT(*) AS "Delayed_Deliveries_Percentage"
        FROM "Delivery_Data"
        WHERE ("Source_PostOffice" = $1);
`,[Pincode]);
        const total_dy=await pool.query(`
        SELECT 
        COUNT(*) AS "Total_Deliveries"
        FROM "Delivery_Data"
        Where "Source_PostOffice" = $1;
`,[Pincode]);
        const total_ot_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER (WHERE "Citizen_Charter_Compliance" = TRUE) AS "On_Time_Deliveries"
        FROM "Delivery_Data"
        Where "Source_PostOffice" = $1;
`,[Pincode]);

const avg_sp_local=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Local" 
        FROM "Delivery_Data"
        WHERE (("Service_ID" = 'DY1201') AND ("Source_PostOffice" = $1));
`,[Pincode]);

const avg_sp_metro=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Metro" 
        FROM "Delivery_Data"
        WHERE (("Service_ID" = 'DY1202') AND ("Source_PostOffice" = $1));
`,[Pincode]);

const avg_sp_state=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Same_State" 
        FROM "Delivery_Data"
        WHERE (("Service_ID" = 'DY1203') AND ("Source_PostOffice" = $1));
`,[Pincode]);

const avg_sp_cstate=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Capital_to_Capital_State" 
        FROM "Delivery_Data"
        WHERE (("Service_ID" = 'DY1205') AND ("Source_PostOffice" = $1));
`,[Pincode]);

const avg_sp_rc=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Rest_of_the_Country" 
        FROM "Delivery_Data"
        WHERE (("Service_ID" = 'DY1204') AND ("Source_PostOffice" = $1));
`,[Pincode]);

        return res.status(200).json({
            message:"Your Data is ready",
            Average_Delivery_Time:avg_dy_td.rows[0],
            On_Time_Delivery_Rate:on_tr_dy.rows[0],
            Delayed_Number_Deliveries:delayed_no_dy.rows[0],
            Delayed_Percentage_Deliveries:delayed_per_dy.rows[0],
            Total_Deliveries:total_dy.rows[0],
            Total_On_Time_Delivery:total_ot_dy.rows[0],
            Average_Delivery_Speed_Post_Local:avg_sp_local.rows[0],
            Average_Delivery_Speed_Post_Metro:avg_sp_metro.rows[0],
            Average_Delivery_Speed_Post_Same_State:avg_sp_state.rows[0],
            Average_Delivery_Speed_Post_Capital_to_Capital_State:avg_sp_cstate.rows[0],
            Average_Delivery_Speed_Post_Rest_of_the_Country:avg_sp_rc.rows[0],
        });
    }catch (err){
        console.log(err);
    }
}

export {DeliveryPO} ;