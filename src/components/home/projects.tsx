import Link from "next/link";

const projects = [
  {
    image: "/projects/real-estate.jpg",
    title: "Real Estate",
    desc: "Rata-rata pengurangan waktu untuk closing deal",
    url: "/real-estate",
    color: "#1736FF",
  },
  {
    image: "/projects/hospitality.jpg",
    title: "Hospitality",
    desc: "Peningkatan interaksi pembeli dengan properti",
    url: "/hospitality",
    color: "#B917FF",
  },
  {
    image: "/projects/malls.jpg",
    title: "Shopping Mall",
    desc: "Prospek lebih berkualitas melalui AI dan otomasi",
    url: "/shopping-mall",
    color: "#00A23B",
  },
  {
    image: "/projects/manufacturing.jpg",
    title: "Manufacturing",
    desc: "Penghematan operasional dan efisiensi proses",
    url: "/manufacturing",
    color: "#87A200",
  },
];

export default function Projects() {
  return (
    <section className="bg-primary-dark p-24 flex flex-col text-center gap-12 w-full justify-center">
      <div className="flex gap-2 flex-col w-full">
        <h1 className="text-3xl font-bold text-white">Project of Tentatics</h1>
        <p className="text-highlight font-light">
          See how property professionals elevate their business with Tentatics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white p-4 rounded-lg shadow flex items-end relative overflow-hidden "
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "280px",
            }}
          >
            {/* Color overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `${project.color}80` }}
            ></div>

            {/* Item */}
            <div className="bg-[#ECECEC]/20 backdrop-blur-lg rounded-lg border border-white text-white p-3 relative z-10">
              <h2 className="text-xl font-semibold text-start">
                {project.title}
              </h2>
              <div className="flex mt-2 items-center gap-5">
                <p className="text-sm text-start">{project.desc}</p>
                <Link
                  href={project.url}
                  className={`bg-black/50 backdrop-blur-lg text-xs px-3 py-2 rounded`}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
