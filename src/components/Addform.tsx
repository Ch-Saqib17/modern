"use client";


import { useState } from "react";
import { NewGuest } from "../../drizzle";

export default function Form() {
  const [name, setName] = useState<NewGuest | null>(null);

  const handelsubmit = async () => {
    try {
      if (name) {
        const res = await fetch("/api/hello", {
          method: "POST",
          body: JSON.stringify({
            name: name.name,
          }),
        });
        console.log(res.ok);
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <form className="relative flex items-center text-sm mb-5">
      <input
        type="text"
        placeholder="Your message..."
        name="entry"
        required
        className=" pl-4 pr-32 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500 block
              w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        onChange={(e) => setName({ name: e.target.value })}
      />

      <button
        onClick={handelsubmit}
        type="button"
        className="flex items-center justify-center absolute right-2 mt-1 font-medium h-7 bg-teal-500/30 text-neutral-900 
  dark:text-neutral-100 rounded w-16"
      >
        Submit
      </button>
    </form>
  );
}
