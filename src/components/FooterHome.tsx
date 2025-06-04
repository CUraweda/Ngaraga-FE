import { FaGamepad, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const FooterHome = () => {
  return (
    <div>
      <footer className="bg-neutral-900 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kiri */}
        <div>
          <h1 className="text-xl font-bold mb-4">NGARAGA</h1>
          <p className="text-sm mb-4">
          Dari portal digital ke tanganmu — klaim kartu langka, pamerkan koleksi, dan jadi legenda baru dalam dunia kolektor.
          </p>
          <p className="mb-4">Join our community</p>
          <div className="flex space-x-4 text-xl">
            <FaGamepad />
            <FaYoutube />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

        {/* Tengah */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Rankings</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </div>

        {/* Kanan */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Join our weekly Update</h2>
          <p className="text-sm mb-4">
            Get exclusive promotions & updates straight to your inbox.
          </p>
          <form className="flex rounded overflow-hidden border border-gray-600 max-w-sm">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-grow px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-t border-gray-700 my-8" />

      <div className="text-center text-sm text-gray-400">
        © Ngaraga by Dolanan yuk X Curaweda
      </div>
    </footer>
    </div>
  );
};

export default FooterHome;
