import Link from "next/link";
import { GrSchedule } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Discover() {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-10 container px-32 py-16 ">
      <div className="">
        <div>
          <h1 className="text-4xl font-bold">
            Siap Menjelajah Proyek Inovatif?
          </h1>
          <p className="text-lg mt-5">
            Terhubung dengan sesama pengembang dan inovator di seluruh Asia
            Tenggara untuk menjelajahi solusi PropTech terkini dan berbagi
            pengetahuan.
          </p>
        </div>

        <ul className="mt-5 flex gap-5 flex-col">
          <li className="flex items-center gap-2">
            <IoCheckmarkCircleOutline />
            Kolaborasi proyek open source
          </li>
          <li className="flex items-center gap-2">
            <IoCheckmarkCircleOutline />
            Konsultasi & bimbingan teknis
          </li>
          <li className="flex items-center gap-2">
            <IoCheckmarkCircleOutline />
            Workshop & pelatihan inovasi
          </li>
          <li className="flex items-center gap-2">
            <IoCheckmarkCircleOutline />
            Pengembangan berbasis komunitas
          </li>
        </ul>

        <Link
          href={"/"}
          className="btn bg-accent-dark mt-5 text-white text-sm font-normal rounded-lg px-4 xl:px-6 py-3 h-auto border-none shadow-none hover:bg-accent-dark/90 transition-colors flex items-center gap-1"
        >
          <GrSchedule />
          <span>Jadwalkan Panggilan</span>
          <IoIosArrowRoundForward className="text-xl" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="bg-gradient-to-tr from-slate-200 to-slate-300 p-6 rounded-lg w-[386px] shadow-2xl">
          <h3 className="text-2xl text-center font-bold">Sorotan Proyek</h3>
          <div className="grid grid-cols-2 mt-10 gap-10">
            <div>
              <h1 className="text-3xl text-center font-bold">25+</h1>
              <p className="text-center text-sm">Proyek Selesai (sample)</p>
            </div>
            <div>
              <h1 className="text-3xl text-center font-bold">15+</h1>
              <p className="text-center text-sm">
                Teknologi Digunakan (sample)
              </p>
            </div>
            <div>
              <h1 className="text-3xl text-center font-bold">3D</h1>
              <p className="text-center text-sm">Visualisasi (sample)</p>
            </div>
            <div>
              <h1 className="text-3xl text-center font-bold">AI</h1>
              <p className="text-center text-sm">Inovasi</p>
            </div>
          </div>
          <p className="text-center text-sm mt-10">
            "Proyek visualisasi 3D membuka kemungkinan baru untuk pameran
            properti."
          </p>
          <div className="flex gap-5 mt-5 items-center justify-center">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm">Ahmad Sutanto (Contoh)</p>
              <p className="text-xs">Pengembang, Jakarta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
