"use client";

import { useEffect, useState } from "react";
import { Guest } from "../../drizzle";

interface IData {
  data: Guest[];
}

export async function GetData(baseUrl: string): Promise<IData> {
  try {
    const data = await fetch(`${baseUrl}/api/hello`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result: IData = await data.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const Formlist = () => {
  const [data, setData] = useState<IData>({ data: [] });

  useEffect(() => {
    const baseUrl = "";

    const fetchData = async () => {
      try {
        const result = await GetData(baseUrl);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="flex flex-col space-y-2">
      {data.data.map((item) => (
        <div
        key={item.id}
        >{item.name}</div>
      ))}
    </div>
  );
};

export default Formlist;
