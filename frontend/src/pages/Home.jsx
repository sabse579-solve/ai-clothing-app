import { Link } from "react-router-dom";
import { GiEternalLove } from "react-icons/gi";
export default function Home() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="h-[90vh] bg-black text-white flex flex-col justify-center items-center text-center px-6">
        <h1 className="mb-10 font-bold flex items-center gap-2">(<GiEternalLove/> A grandmother's Eternal and Agape love turned into a New Form of Life...)</h1>

        <h1 className="text-5xl font-extrabold mb-4">
          Design Your Own <span className="text-blue-400">AI Clothing</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl">
          Generate custom AI-powered t-shirt, hoodie, and streetwear designs instantly.
          Turn your imagination into real products with one click!
        </p>

        <div className="mt-8 flex gap-6">

          {/* ❗ FIXED: Users must start at measurements */}
          <Link
            to="/measurements"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
          >
            Start Your Avatar
          </Link>

          {/* Added: Direct link to AI Design Studio for returning users */}
          <Link
            to="/design-studio"
            className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg text-lg"
          >
            AI Design Studio
          </Link>

          {/* Existing Browse Store button */}
          <Link
            to="/store"
            className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg text-lg"
          >
            Browse Store
          </Link>

        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 px-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose AI Clothing?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-3">💡 AI-Generated Designs</h3>
            <p className="text-gray-700">
              Describe your idea and instantly generate unique clothing artwork.
            </p>
          </div>

          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-3">🎨 Fully Customizable</h3>
            <p className="text-gray-700">
              Choose styles, change prompts, and preview your design in real-time.
            </p>
          </div>

          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-3">🛍 Easy Ordering</h3>
            <p className="text-gray-700">
              Add designs to your store and let customers order in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE SHOWCASE */}
      <section className="py-20 px-8 bg-white">

        <h2 className="text-3xl font-bold text-center mb-10">
          See What You Can Create
        </h2>

        <div className="flex flex-wrap justify-center gap-8">

          <img
            src="https://media.istockphoto.com/photos/woman-is-sketching-pattern-on-a-linen-fabric-seamstress-basting-and-picture-id1361306704?b=1&k=20&m=1361306704&s=170667a&w=0&h=Bi4YcwChkba1QMlDbrHA7FL56X8H0gO3rlLILa5OUYM="
            className="w-64 h-80 object-cover rounded-lg shadow"
          />
          <img
            src="https://images.squarespace-cdn.com/content/v1/621dba90c2f785250fe95265/1678428658510-H5MA4Q2HBVH4YPFKE5HX/oh+the+potential+.png"
            className="w-64 h-80 object-cover rounded-lg shadow"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1664872566732-d5a16add5989"
            className="w-64 h-80 object-cover rounded-lg shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
            className="w-64 h-80 object-cover rounded-lg shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            className="w-64 h-80 object-cover rounded-lg shadow"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1661476167719-b45042146a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFicmljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            className="w-64 h-80 object-cover rounded-lg shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8Y2xvdGhpbmclMjBzdG9yZXx8MHx8fHwxNjI2NzUyMzgx&ixlib=rb-1.2.1&q=80&w=1080"
            className="w-64 h-80 object-cover rounded-lg shadow"
          />

        </div>

        <div className="text-center mt-10">
          <Link
            to="/design-studio"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Start Designing
          </Link>
        </div>
      </section>

    </div>
  );
}
