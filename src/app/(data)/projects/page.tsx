

import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { client } from "../../../../sanity/lib/client";
interface Data {
  _id: string;
  name: string;
  overview: string;
  imageUrl: string;
  link: string;
}

async function GetData() {
  try {
    const result = await client.fetch(`
    *[_type == "projects"]{
      _id,
        name,
        overview,
        "imageUrl":image.asset->url,
          link
    }
    `);
    return result;
  } catch (error) {
    console.log("Error in Fetching", error);
  }
}

export default async function Projects() {
  const data: Data[] = await GetData();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Projects
        </h1>
      </div>
      <div className="grid gap-y-8 sm:gap-8 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8 pb-10">
        {data.map((project) => (
          <article
            key={project._id}
            className="overflow-hidden dark:border-zinc-600  rounded-lg border border-gray-100  bg-white shadow-lg 
          dark:bg-black dark:shadow-gray-700  shadow-teal-100"
          >
            <div className="h-56 w-full relative">
              <Image
                src={project.imageUrl}
                alt=""
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <Link href={project.link} target="_blank">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {project.name}
                </h3>
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
                {project.overview}
              </p>
              <Link
                href={project.link}
                target="_blank"
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500"
              >
                View
                <span className="block transition-all group-hover:ms-0.5">
                  &rarr;
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
