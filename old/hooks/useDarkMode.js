import { useEffect, useState } from "react"

const Themes = {
  Dark: "dark",
  Light: "light"
}

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : Themes.Dark
  )

  const colorTheme = theme === Themes.Dark ? Themes.Light : Themes.Dark

  useEffect(() => {
    const root = window.document.documentElement

    // Set default theme to dark
    if(theme === undefined) {
      setTheme(localStorage.theme ?? Themes.Dark)
    }

    root.classList.remove(colorTheme)
    root.classList.add(theme)

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  return [colorTheme, setTheme]
}

export default useDarkMode