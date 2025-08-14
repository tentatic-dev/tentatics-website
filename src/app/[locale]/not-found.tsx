import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-base-100 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-light text-primary animate-bounce">
            404
          </h1>
          <p className="text-xl text-center mt-5">
            Sepertinya kamu tersesat .<br />
            <span className="text-sm text-gray-500">
              Halaman ini belum tersedia.
            </span>
          </p>
          <Link href="/" className="mt-8 px-6 py-2 ">
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </>
  );
}
