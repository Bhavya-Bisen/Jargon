"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

// Register necessary components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Helper Function to Generate Pie Chart Data
const generatePieChartData = (labels, data, colors) => ({
  labels,
  datasets: [
    {
      label: "Percentage",
      data,
      backgroundColor: colors,
      borderColor: colors.map((color) => color.replace("0.2", "1")), // Darker border color
      borderWidth: 1,
    },
  ],
});
interface DashboardData {
  message: string;
  Average_Delivery_Time: { Average_Delivery_Time_Days: string };
  On_Time_Delivery_Rate: { On_Time_Delivery_Rate_Percentage: string };
  Delayed_Number_Deliveries: { Delayed_Deliveries_Count: string };
  Delayed_Percentage_Deliveries: { Delayed_Deliveries_Percentage: string };
  Total_Deliveries: { Total_Deliveries: string };
  Total_On_Time_Delivery: { On_Time_Deliveries: string };
  Average_Delivery_Speed_Post_Local: { Average_Delivery_Time_Speed_Post_Local: string };
  Average_Delivery_Speed_Post_Metro: { Average_Delivery_Time_Speed_Post_Metro: string };
  Average_Delivery_Speed_Post_Same_State: { Average_Delivery_Time_Speed_Post_Same_State: string };
  Average_Delivery_Speed_Post_Capital_to_Capital_State: { Average_Delivery_Time_Speed_Post_Capital_to_Capital_State: string };
  Average_Delivery_Speed_Post_Rest_of_the_Country: { Average_Delivery_Time_Speed_Post_Rest_of_the_Country: string };
}

export default function PerformanceDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [pincode, setPincode] = useState<string>(""); // Track the entered pincode
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const [selectedState, setSelectedState] = useState<string>(""); // Selected state
  const [mapHTML, setMapHTML] = useState<string>(""); // Store the map HTML
  const [states, setStates] = useState<string[]>([]); // List of states
  const [isLoadingStates, setIsLoadingStates] = useState(false); // State loading indicator

  const handleCheckboxChange = (value: string[]) => {
    setSelectedCheckboxes([...value]); // Ensure value is an array
  };

  // Fetch default data on component mount
  useEffect(() => {
    fetch("http://localhost:5000/dashboard", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching default data:", error);
      });
  }, []); // Run only once on component mount

  // Fetch user-specific data when pincode is entered
  useEffect(() => {
    if (!pincode) return; // Only fetch when pincode is entered

    const timeoutId = setTimeout(() => {
      fetch("http://localhost:5000/deliveryPO", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Pincode: pincode }),
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
        })
        .catch((error) => {
          console.error("Error fetching user-specific data:", error);
        });
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeoutId); // Cleanup timeout on pincode change
  }, [pincode]);

   // Fetch data for the selected state
   const fetchStateData = async (state: string) => {
    try {
      const response = await fetch("http://localhost:5000/sdeliveryPO", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ State: state }),
      });
      if (!response.ok) throw new Error("Failed to fetch state-specific data");
      const jsonData = await response.json();
      setData(jsonData); // Update the data state with the response
    } catch (error) {
      console.error("Error fetching state-specific data:", error);
    }
  };

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsLoadingStates(true);
        const response = await fetch("http://localhost:5000/statePO");
        if (!response.ok) throw new Error("Failed to fetch states");
        const data = await response.json();
        const stateNames = data.result.map((state: { StateName: string }) => state.StateName);
        setStates(stateNames);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Render chart when data is updated
  useEffect(() => {
    if (data && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      chartInstance.current = new ChartJS(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Local", "Metro", "Same State", "Capital to Capital", "Rest of Country"],
          datasets: [
            {
              label: "Average Speed Post Delivery Time (Days)",
              data: [
                parseFloat(data.Average_Delivery_Speed_Post_Local.Average_Delivery_Time_Speed_Post_Local),
                parseFloat(data.Average_Delivery_Speed_Post_Metro.Average_Delivery_Time_Speed_Post_Metro),
                parseFloat(data.Average_Delivery_Speed_Post_Same_State.Average_Delivery_Time_Speed_Post_Same_State),
                parseFloat(data.Average_Delivery_Speed_Post_Capital_to_Capital_State.Average_Delivery_Time_Speed_Post_Capital_to_Capital_State),
                parseFloat(data.Average_Delivery_Speed_Post_Rest_of_the_Country.Average_Delivery_Time_Speed_Post_Rest_of_the_Country),
              ],
              backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: true, position: "top" } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }
  }, [data]);

    // Handle state selection
  const handleStateSelection = (keys: Set<string>) => {
    const state = Array.from(keys).join(", ");
    setSelectedState(state);
    fetchStateData(state); // Fetch data for the selected state
     
  };

  const submitData = async () => {
    const payload = {
      pincode: pincode || null,
      state: selectedState || null,
    };  
  try {
    const response = await fetch("http://localhost:5000/generateMap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to generate map");
    const result = await response.json();
    setMapHTML(result.mapHTML); // Save the map HTML
  } catch (error) {
    console.error("Error generating map:", error);
    alert("Failed to generate map.");
  }
};

    return (
        <>
          <div className="h-1/2 w-full md:flex-row flex flex-col justify-around items-start">
            <div className="p-5 items-start">
                <ul >
                    <li className=" block-flex w-[292px] h-[1392px] bg-[rgba(219,212,204,1)] border-slate-950 border-[1px]">
                    <CheckboxGroup 
                      defaultValue={["Delivery"]} 
                      label="Category"
                    >
                      <Checkbox value="Delivery">Delivery</Checkbox>
                      <Checkbox value="Counter">Counter</Checkbox>
                      <Checkbox value="Financial">Financial</Checkbox>
                      <Checkbox value="Grivance">Grievance</Checkbox>
                    </CheckboxGroup>
                      <CheckboxGroup
                        defaultValue={["Delivery"]}
                        label="Credentials"
                        onChange={handleCheckboxChange}
                      >
                        <Checkbox value="Pincode">Pincode</Checkbox>
                        {selectedCheckboxes.includes("Pincode") && (
                          <div className="mt-2">
                            <label>Pincode:</label>
                            <input
                              type="text"
                              placeholder="Enter Pincode"
                              className="w-full border border-gray-400 p-2 rounded"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                            />
                          </div>
                        )}
                        <Checkbox value="State">State</Checkbox>
                        {selectedCheckboxes.includes("State") && (
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="bordered">{selectedState || "Select State"}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              className="bg-white overflow-y-auto max-h-[200px]"
                              disallowEmptySelection
                              aria-label="State selection"
                              selectionMode="single"
                              onSelectionChange={(keys) => handleStateSelection(new Set(keys as Set<string>))}
                            >
                              {isLoadingStates ? (
                                <DropdownItem key="loading" textValue="Loading">
                                  Loading...
                                </DropdownItem>
                              ) : states.length > 0 ? (
                                states.map((state) => (
                                  <DropdownItem key={state} textValue={state}>
                                    {state}
                                  </DropdownItem>
                                ))
                              ) : (
                                <DropdownItem key="no-states" textValue="No states available">
                                  No states available
                                </DropdownItem>
                              )}
                            </DropdownMenu>
                          </Dropdown>
                        )}
                        <Checkbox value="City/District">City/District</Checkbox>
                        <Checkbox value="Post Office Name">Post Office Name</Checkbox>
                      </CheckboxGroup>
                    </li>
                    
                </ul>
            </div>
            <div>
              <ul>
                <div className="block">
                <li className="bg-[rgba(193,200,184,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                  <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">Average Time Taken for Delivery</a>
                  <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]" >{data ? parseFloat(data.Average_Delivery_Time.Average_Delivery_Time_Days).toFixed(2) : "Loading..."} Days</span>
                </li>
                <li className="bg-[rgba(160,177,100,0.39)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                  <a className="text-[rgba(112,65,22,1)] text-center font-bold text-4xl pb-4">No. of Delayed Delivery</a>
                </li>
                <li className="bg-[rgba(190,197,164,1)] w-[308px] h-[271px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                  <a className="text-[rgba(112,65,22,1)] text-center font-bold text-3xl pb-4">No. of Delayed Delivery</a>
                  <span className="text-[rgba(79,46,16,1)] font-outfit text-4xl font-semibold text-center [text-shadow:3px_3px_6px_rgba(0,0,0,0.5)]">
                    {data?.Delayed_Percentage_Deliveries?.Delayed_Deliveries_Percentage 
                      ? `${parseFloat(data.Delayed_Percentage_Deliveries.Delayed_Deliveries_Percentage).toFixed(2)}%`
                      : "N/A"}
                  </span>
                </li>
                </div>
                <div  className="block">
                  <li className="bg-[rgba(241,234,216,1)] w-[287px] h-[192px] rounded-3xl inline-flex flex-col justify-center items-center mx-6">
                    {/* Pie1 */}
                  </li>
                  <li className="bg-[rgba(241,234,216,1)] w-[287px] h-[192px] rounded-3xl inline-flex flex-col justify-center items-center mx-6">
                    {/*  Pie2 */}
                  </li>
                  <li className="bg-[rgba(241,234,216,1)] w-[462px] h-[238px] rounded-3xl inline-flex flex-col justify-center items-center m-6">
                    
                  </li>
                </div>
                <div className="block">
                  <li className="bg-[rgba(241,234,216,1)] w-[609px] h-[308px] rounded-3xl inline-flex flex-col justify-center items-center mx-6">
                    
                  </li>
                  <li className="bg-[rgba(241,234,216,1)] w-[464px] h-[273px] rounded-3xl inline-flex flex-col justify-center items-center mx-6">

                  </li>
                      
                </div>
                <div className=" w-[1128px] h-[643px] ">
                          <div
                            className="border-gray-950 border-[5px]"
                            dangerouslySetInnerHTML={{ __html: mapHTML }}
                          ></div>
                        </div>
              </ul>
            </div>
          </div>
        </>
    )
}