"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function LocatePO() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // Selected district
  const [selectedState, setSelectedState] = useState<string>(""); // Selected state
  const [pincode, setPincode] = useState<string>(""); // Pincode input
  const [states, setStates] = useState<string[]>([]); // Fetched states
  const [districts, setDistricts] = useState<string[]>([]); // Fetched districts
  const [isLoadingStates, setIsLoadingStates] = useState(true); // Loading state for states
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false); // Loading state for districts
  const [mapHTML, setMapHTML] = useState<string>(""); // Store the map HTML

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
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

  // Fetch districts based on selected state
  const fetchDistricts = async (state: string) => {
    try {
      setIsLoadingDistricts(true);
      const response = await fetch("http://localhost:5000/districtPO", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ State: state }),
      });
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      const districtNames = data.result.map((district: { District: string }) => district.District);
      setDistricts(districtNames);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingDistricts(false);
    }
  };

  const submitData = async () => {
    const payload = {
      pincode: pincode || null,
      state: selectedState || null,
      district: selectedDistrict || null,
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

  // Handle state selection
  const handleStateSelection = (keys: Set<string>) => {
    const state = Array.from(keys).join(", ");
    setSelectedState(state);
    fetchDistricts(state);
    submitData(); // Submit data when state changes
  };

  // Handle district selection
  const handleDistrictSelection = (keys: Set<string>) => {
    const district = Array.from(keys).join(", ");
    setSelectedDistrict(district);
    submitData(); // Submit data when district changes
  };

  // Handle pincode input change
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  // Handle pincode form submission
  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitData(); // Submit data when pincode is entered
  };

  return (
    <>
    <div className="h-1/2 w-full flex md:flex-row flex-row justify-around items-start">
      <div className="p-5">
        <ul>
          {/* Pincode Input */}
          <li className="inline-flex border-[rgba(112,65,22,1)] bg-[rgba(219,212,204,1)] w-[181px] h-[65px] rounded-[50px] border-[1px] font-bold items-center justify-center m-5">
            <form onSubmit={handlePincodeSubmit}>
              <input
                name="pincode"
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={handlePincodeChange}
                className="text-[25px] font-extrabold leading-[51.89px] text-center bg-transparent outline-none w-full h-full text-[rgba(112,65,22,1)]"
              />
            </form>
          </li>

          {/* State Dropdown */}
          <li className="inline-flex border-[rgba(112,65,22,1)] bg-[rgba(219,212,204,1)] w-[181px] h-[65px] rounded-[50px] border-[1px] font-bold items-center justify-center m-5">
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
          </li>

          {/* District Dropdown */}
          <li className="inline-flex border-[rgba(112,65,22,1)] bg-[rgba(219,212,204,1)] w-[181px] h-[65px] rounded-[50px] border-[1px] font-bold items-center justify-center m-5">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">{selectedDistrict || "Select District"}</Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-white overflow-y-auto max-h-[200px]"
                disallowEmptySelection
                aria-label="District selection"
                selectionMode="single"
                onSelectionChange={(keys) => handleDistrictSelection(new Set(keys as Set<string>))}
              >
                {isLoadingDistricts ? (
                  <DropdownItem key="loading" textValue="Loading">
                    Loading districts...
                  </DropdownItem>
                ) : districts.length > 0 ? (
                  districts.map((district) => (
                    <DropdownItem key={district} textValue={district}>
                      {district}
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem key="no-districts" textValue="No districts available">
                    No districts available
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>

      {/* <div className="flex justify-center items-center">
        <iframe
          src="/map.html"
          width="1128px"
          height="643px"
          className=" border-gray-950 border-[5px]"
          />
      </div> */}

    {/* Map Generation and showing */}
    <div className="flex justify-center items-center">
      <div className=" w-[1128px] h-[643px] ">
        <div
          className="border-gray-950 border-[5px]"
          dangerouslySetInnerHTML={{ __html: mapHTML }}
        ></div>
      </div>
    </div>

    </>
  );
}
