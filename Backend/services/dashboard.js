import pool from "../config/postgres.js";

const dashboard_data=async (req,res,next)=>{
    try{
        const avg_dy_td=await pool.query(`
        SELECT 
        AVG("Delivery_Time") / 86400 AS "Average_Delivery_Time_Days"  -- Convert seconds to days
        FROM "Delivery_Data";
`);
        const on_tr_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER 
        (WHERE "Citizen_Charter_Compliance" = TRUE) * 100.0 / COUNT(*) AS "On_Time_Delivery_Rate_Percentage"
        FROM "Delivery_Data";
`);
        const delayed_no_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER (WHERE "Citizen_Charter_Compliance" = FALSE) AS "Delayed_Deliveries_Count"
        FROM "Delivery_Data";
`);
        const delayed_per_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER (WHERE "Citizen_Charter_Compliance" = FALSE) * 100.0 / COUNT(*) AS "Delayed_Deliveries_Percentage"
        FROM "Delivery_Data";
`);
        const total_dy=await pool.query(`
        SELECT 
        COUNT(*) AS "Total_Deliveries"
        FROM "Delivery_Data";
`);
        const total_ot_dy=await pool.query(`
        SELECT 
        COUNT(*) FILTER (WHERE "Citizen_Charter_Compliance" = TRUE) AS "On_Time_Deliveries"
        FROM "Delivery_Data";
`);
        return res.status(200).json({
            message:"Your Data is ready",
            Average_Delivery_Time:avg_dy_td.rows[0],
            On_Time_Delivery_Rate:on_tr_dy.rows[0],
            Delayed_Number_Deliveries:delayed_no_dy.rows[0],
            Delayed_Percentage_Deliveries:delayed_per_dy.rows[0],
            Total_Deliveries:total_dy.rows[0],
            Total_On_Time_Delivery:total_ot_dy.rows[0],
        });
    }catch (err){
        console.log(err);
    }
}

export {dashboard_data} ;