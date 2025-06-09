import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-6 text-yellow-300 drop-shadow-lg">
        Welcome to ElectroMart
      </h1>
      <p className="max-w-3xl text-lg text-yellow-100 mb-12 text-center leading-relaxed">
        Your ultimate destination for all electronic components — resistors, capacitors, ICs and more!  
        Find quality parts uploaded by our community and purchase them easily.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
        {[
          {
            name: "Digi-Key",
            url: "https://www.digikey.com/",
            desc: "Trusted global supplier with extensive inventory and fast shipping.",
          },
          {
            name: "Mouser Electronics",
            url: "https://www.mouser.com/",
            desc: "Wide variety of components and cutting-edge electronics parts.",
          },
          {
            name: "Element14",
            url: "https://www.element14.com/",
            desc: "Community focused supplier with technical resources and support.",
          },
        ].map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg hover:scale-105 transition transform cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2 text-white">{site.name}</h2>
            <p className="text-yellow-100">{site.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
