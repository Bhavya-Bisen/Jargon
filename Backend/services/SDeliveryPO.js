import pool from "../config/postgres.js";

const SDeliveryPO = async (req, res, next) => {
  const State = req.body.State;
  if (!State) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const avg_dy_td = await pool.query(
      `
      SELECT 
        AVG(dd."Delivery_Time") / 86400 AS "Average_Delivery_Time_Days"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1;
    `,
      [State]
    );

    const on_tr_dy = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER 
        (WHERE dd."Citizen_Charter_Compliance" = TRUE) * 100.0 / COUNT(*) AS "On_Time_Delivery_Rate_Percentage"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1;
    `,
      [State]
    );

    const delayed_no_dy = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE dd."Citizen_Charter_Compliance" = FALSE) AS "Delayed_Deliveries_Count"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1;
    `,
      [State]
    );

    const delayed_per_dy = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE dd."Citizen_Charter_Compliance" = FALSE) * 100.0 / COUNT(*) AS "Delayed_Deliveries_Percentage"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1;
    `,
      [State]
    );

    const total_dy = await pool.query(
      `
      SELECT 
        COUNT(*) AS "Total_Deliveries"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1;
    `,
      [State]
    );

    const total_ot_dy = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE dd."Citizen_Charter_Compliance" = TRUE) AS "On_Time_Deliveries"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1;
    `,
      [State]
    );

    const avg_sp_local = await pool.query(
      `
      SELECT 
        AVG(dd."Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Local"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        dd."Service_ID" = 'DY1201' AND po."StateName" = $1;
    `,
      [State]
    );

    const avg_sp_metro = await pool.query(
      `
      SELECT 
        AVG(dd."Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Metro"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        dd."Service_ID" = 'DY1202' AND po."StateName" = $1;
    `,
      [State]
    );

    const avg_sp_state = await pool.query(
      `
      SELECT 
        AVG(dd."Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Same_State"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        dd."Service_ID" = 'DY1203' AND po."StateName" = $1;
    `,
      [State]
    );

    const avg_sp_cstate = await pool.query(
      `
      SELECT 
        AVG(dd."Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Capital_to_Capital_State"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        dd."Service_ID" = 'DY1205' AND po."StateName" = $1;
    `,
      [State]
    );

    const avg_sp_rc = await pool.query(
      `
      SELECT 
        AVG(dd."Delivery_Time") / 86400 AS "Average_Delivery_Time_Speed_Post_Rest_of_the_Country"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        dd."Service_ID" = 'DY1204' AND po."StateName" = $1;
    `,
      [State]
    );

    const monthlyDeliveries = await pool.query(
      `
      SELECT 
        TO_CHAR(dd."Delivery_Delivered_Time", 'Month') AS "Month",
        COUNT(*) AS "Delivery_Count"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      WHERE 
        po."StateName" = $1
      GROUP BY 
        TO_CHAR(dd."Delivery_Delivered_Time", 'Month')
      ORDER BY 
        MIN(dd."Delivery_Delivered_Time");
    `,
      [State]
    );

    const serviceDeliveries = await pool.query(
      `
      SELECT 
        s."Service_Name",
        COUNT(dd."Service_ID") AS "Delivery_Count"
      FROM 
        "Delivery_Data" dd
      JOIN 
        "Post_Offices" po
      ON 
        dd."Source_PostOffice" = po."Pincode"::text
      JOIN 
        "Services" s
      ON 
        dd."Service_ID" = s."Service_ID"
      WHERE 
        po."StateName" = $1
      GROUP BY 
        s."Service_Name"
      ORDER BY 
        "Delivery_Count" DESC;
    `,
      [State]
    );

    return res.status(200).json({
      message: "Your Data is ready",
      Average_Delivery_Time: avg_dy_td.rows[0],
      On_Time_Delivery_Rate: on_tr_dy.rows[0],
      Delayed_Number_Deliveries: delayed_no_dy.rows[0],
      Delayed_Percentage_Deliveries: delayed_per_dy.rows[0],
      Total_Deliveries: total_dy.rows[0],
      Total_On_Time_Delivery: total_ot_dy.rows[0],
      Average_Delivery_Speed_Post_Local: avg_sp_local.rows[0],
      Average_Delivery_Speed_Post_Metro: avg_sp_metro.rows[0],
      Average_Delivery_Speed_Post_Same_State: avg_sp_state.rows[0],
      Average_Delivery_Speed_Post_Capital_to_Capital_State: avg_sp_cstate.rows[0],
      Average_Delivery_Speed_Post_Rest_of_the_Country: avg_sp_rc.rows[0],
      Monthly_Deliveries: monthlyDeliveries.rows,
      Service_Deliveries: serviceDeliveries.rows, // Add service deliveries data
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error." });
  }
};

export { SDeliveryPO };
