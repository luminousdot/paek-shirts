"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, User, Shirt, Ruler, Send } from "lucide-react";
import { submitOrder } from "@/app/actions/submitOrder";

const versions = [
  {
    id: "topo-division",
    name: "Topo Division",
    type: "Unisex",
    description: "Minimal crna majica sa topo linijama i penjačem.",
    image: "/designs/topo_division.png",
  },
  {
    id: "indoor-boulder-gym",
    name: "Indoor Boulder Gym",
    type: "Muška",
    description: "Indoor boulder zid, soliteri u pozadini, tamni sportski fazon.",
    image: "/designs/indoor_boulder_gym.png",
  },
  {
    id: "indoor-boulder-women",
    name: "Indoor Boulder Gym",
    type: "Ženska",
    description: "Ženski kroj sa indoor boulder scenom i urbanim pozadinama.",
    image: "/designs/indoor_boulder_women.png",
  },
  {
    id: "indoor-boulder-city",
    name: "Indoor Boulder City",
    type: "Unisex",
    description: "Boulder scena sa gradskim motivima.",
    image: "/designs/indoor_boulder_city_versions.png",
  },
  {
    id: "planet-boulder",
    name: "Planet Boulder",
    type: "Unisex",
    description: "Planeta sa hvatovima, gradski soliteri i boulder scena.",
    image: "/designs/planet_boulder_tshirt.png",
  },
  {
    id: "planet-boulder-versions",
    name: "Planet Boulder",
    type: "Verzije",
    description: "Planet Boulder u više kolor verzija.",
    image: "/designs/planet_boulder_versions.png",
  },
  {
    id: "urban-boulder-outdoor",
    name: "Urban Boulder",
    type: "Outdoor",
    description: "Urban boulder sa outdoor penjačkim motivima.",
    image: "/designs/urban_boulder_outdoor.png",
  },
  {
    id: "urban-climbing",
    name: "Urban Climbing",
    type: "Unisex",
    description: "Urban penjački dizajn sa gradskim elementima.",
    image: "/designs/urban_climbing.png",
  },
  {
    id: "urban-climbing-women",
    name: "Urban Climbing",
    type: "Ženska",
    description: "Ženski kroj sa urban climbing motivima.",
    image: "/designs/urban_climbing_women.png",
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function OrderForm() {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [size, setSize] = useState("M");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const result = await submitOrder({
      name,
      email,
      model: selectedVersion.name,
      type: selectedVersion.type,
      size,
      note,
    });

    setStatus(result.success ? "success" : "error");
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-5"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400">
            <Check size={32} className="text-neutral-950" />
          </div>
          <h1 className="text-3xl font-semibold">Porudžbina primljena!</h1>
          <p className="mt-4 text-neutral-400">
            Javićemo ti se uskoro na <span className="text-neutral-200">{email}</span>.
          </p>
          <button
            onClick={() => {
              setName("");
              setEmail("");
              setNote("");
              setSize("M");
              setSelectedVersion(versions[0]);
              setStatus("idle");
            }}
            className="mt-8 rounded-2xl border border-neutral-700 px-6 py-3 text-sm text-neutral-300 hover:border-neutral-500 transition"
          >
            Naruči još jednu
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-8 lg:py-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-amber-400">Niš Climbing Club</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Izaberi svoju penjačku majicu
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-400">
              Odaberi verziju, veličinu, upiši ime i mejl. Porudžbina stiže direktno organizatoru.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {versions.map((version) => {
              const active = selectedVersion.id === version.id;
              return (
                <button
                  key={version.id}
                  onClick={() => setSelectedVersion(version)}
                  className={`group overflow-hidden rounded-3xl border text-left transition ${
                    active
                      ? "border-amber-400 bg-neutral-900 shadow-2xl shadow-amber-950/30"
                      : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-600"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <img
                      src={version.image}
                      alt={version.name}
                      className="h-full w-full object-cover opacity-70 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    {active && (
                      <div className="absolute right-4 top-4 rounded-full bg-amber-400 p-2 text-neutral-950">
                        <Check size={18} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold">{version.name}</h2>
                      <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
                        {version.type}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-neutral-400">{version.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="sticky top-6 h-fit rounded-[2rem] border border-neutral-800 bg-neutral-900/80 p-5 shadow-2xl backdrop-blur"
        >
          <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-neutral-800 bg-neutral-950">
            <div className="relative aspect-[4/5]">
              <img
                src={selectedVersion.image}
                alt={selectedVersion.name}
                className="h-full w-full object-cover opacity-75 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-400">Selected</p>
                <h3 className="mt-2 text-3xl font-semibold">{selectedVersion.name}</h3>
                <p className="mt-1 text-neutral-400">{selectedVersion.type}</p>
              </div>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300">
                <Ruler size={16} /> Veličina
              </label>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setSize(item)}
                    className={`rounded-xl border py-3 text-sm font-semibold transition ${
                      size === item
                        ? "border-amber-400 bg-amber-400 text-neutral-950"
                        : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300">
                <User size={16} /> Ime i prezime
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="npr. Vladimir Dević"
                className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none transition placeholder:text-neutral-600 focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300">
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ime@email.com"
                className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none transition placeholder:text-neutral-600 focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300">
                <Shirt size={16} /> Napomena
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="npr. Ako može malo širi kroj..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none transition placeholder:text-neutral-600 focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-neutral-950 transition hover:bg-amber-300 disabled:opacity-60"
            >
              <Send size={18} />
              {status === "loading" ? "Slanje..." : "Pošalji porudžbinu"}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Nešto je pošlo po zlu. Pokušaj ponovo.
              </p>
            )}
          </form>
        </motion.aside>
      </section>
    </main>
  );
}
