import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useRef } from "react"
import { navigate } from "astro:transitions/client"
import toast, { Toaster } from "react-hot-toast"

const Scan = () => {
  const scannerRef = useRef()

  useEffect(() => {
    let scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 30, qrbox: { width: 200, height: 200 } },
      false,
    )

    scannerRef.current = scanner

    const onScanSuccess = (decodedText, decodedResult) => {
      console.log(decodedText)
      if (decodedText == "QRBELUMPILIH") {
        if (scannerRef.current) {
          scannerRef.current.clear().catch((error) => {
            console.error("Gagal membersihkan scanner:", error)
          })
        }
        navigate("/pilih")
      }
      if (decodedText == "QRSUDAHPILIH") {
        console.log("Sudah pilih woy")
        toast.error("Anda sudah melakukan pemilihan", {
          duration: 2000,
          position: "top-center",
        })
      }
    }
    const onScanFailure = (error) => {}

    scanner.render(onScanSuccess, onScanFailure)
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          console.error("Gagal membersihkan scanner:", error)
        })
      }
    }
  }, [])

  return (
    <div className="flex justify-center items-center p-16">
      <div id="reader" className="w-80"></div>
      <Toaster />
    </div>
  )
}

export default Scan
