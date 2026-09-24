import React, { useState, useEffect } from "react"

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Sinkronisasi state jika pengguna keluar fullscreen lewat tombol ESC
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Masuk ke mode fullscreen pada elemen root dokumen (atau elemen spesifik)
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      // Keluar dari mode fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <button
      onClick={toggleFullscreen}
      style={{
        padding: "10px 16px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "background 0.2s",
      }}
    >
      {isFullscreen ? "Keluar Fullscreen" : "Masuk Fullscreen"}
    </button>
  )
}
