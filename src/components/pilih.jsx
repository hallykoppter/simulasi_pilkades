import { useState } from "react"
import { navigate } from "astro:transitions/client"

const listPilihan = [
  {
    id: "A",
    nama: "Buah Alpukat",
    gambar: "alpukat-01.jpg",
  },
  {
    id: "B",
    nama: "Buah Rambutan",
    gambar: "rambutan-01.jpg",
  },
  {
    id: "C",
    nama: "Buah Semangka",
    gambar: "semangka-01.jpg",
  },
]

const Pilih = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [berhasilPilih, setBerhasilPilih] = useState(false)
  const selectedCard = listPilihan.find((list) => list.id === selectedId)
  console.log(isModalOpen)

  const handlePilih = () => {
    if (!selectedId) {
      alert("silakan pilih salah satu terlebih dahulu")
      return
    }
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    setBerhasilPilih(true)
    setIsModalOpen(false)
    setTimeout(() => (setBerhasilPilih(false), navigate("/")), 5000)
  }

  return (
    <div className="flex flex-col p-2 md:p-4 gap-0 md:gap-4 transition-transform justify-center items-center rounded-xl w-full">
      <div className="md:scale-100 scale-75">
        <img src="ciamis.png" width={52} height={"auto"} alt="ciamis" />
      </div>
      <div className="flex flex-col items-center md:text-md text-sm">
        <h1 className="font-bold">SURAT SUARA</h1>
        <h2>PEMILIHAN KEPALA DESA JANGALAHARJA</h2>
        <h2>KECAMATAN RANCAH</h2>
        <h2>KABUPATEN CIAMIS</h2>
        <h2>TAHUN 2026</h2>
      </div>
      <div className="flex gap-1 md:gap-4 items-center justify-between">
        {listPilihan.map((i) => {
          const isSelected = selectedId === i.id
          return (
            <div
              className={`flex flex-col md:scale-100 scale-80 border rounded-md justify-center items-center p-3 relative ${isSelected ? "border-red-600 ring-2 ring-red-600 shadow-md" : "border"}`}
              key={i.id}
              onClick={() => setSelectedId(i.id)}
            >
              <div className="absolute bg-blue-500 rounded-md text-white p-2 top-2 left-2">
                {i.id}
              </div>
              <img
                className="rounded-xl"
                src={i.gambar}
                alt={i.nama}
                width={90}
                height={"auto"}
              />
              <h1>{i.nama}</h1>
            </div>
          )
        })}
      </div>
      <button
        onClick={handlePilih}
        className="flex justify-center items-center w-full rounded-md md:p-3 p-2 bg-red-400 font-bold text-white"
      >
        Pilih Kandidat Ini
      </button>

      {/* Modal */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white flex flex-col justify-between rounded-lg p-6 w-full shadow-xl mx-10 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold mb-1">Konfirmasi Pilihan</h3>
              <p className="text-red-500 mb-2">
                Apa Anda yakin akan memilih kandidat ini?
              </p>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col scale-75 md:scale-100 justify-center items-center p-3 border rounded-xl">
                <img
                  className="rounded-xl"
                  src={selectedCard.gambar}
                  width={90}
                  height={"auto"}
                  alt={selectedCard.nama}
                />
                <h1 className="font-bold">{selectedCard.nama}</h1>
              </div>
            </div>

            {/* Aksi Modal */}
            <div className="flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="grow px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                Ulangi
              </button>
              <button
                onClick={handleConfirm}
                className="grow px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      )}
      {berhasilPilih && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white flex flex-col justify-center items-center rounded-lg p-6 scale-150 shadow-xl animate-fade-in">
            <img
              src="checklist-hijau.png"
              alt="Checklist"
              width={50}
              height={"auto"}
            />
            <h1 className="font-bold">Terima Kasih</h1>
            <h2>Suara berhasil dikirim dan tersimpan</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pilih
