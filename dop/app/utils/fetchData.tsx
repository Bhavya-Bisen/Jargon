// utils/fetchData.ts
export const fetchStates = async (): Promise<string[]> => {
    const response = await fetch("http://localhost:5000/statePO");
    if (!response.ok) throw new Error("Failed to fetch states");
    const data = await response.json();
    console.log(data);
    if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array");
    }
    return data;
};


  
export const fetchDistricts = async (state: string): Promise<string[]> => {
    const response = await fetch(`http://localhost:5000/districtPO?state=${state}`);
    if (!response.ok) throw new Error("Failed to fetch districts");
    return await response.json();
  };