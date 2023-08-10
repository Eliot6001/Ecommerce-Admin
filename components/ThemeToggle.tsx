"use client";

import {useState} from "react";
import { Moon, PenLine, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Icon } from "@radix-ui/react-select";


export function ModeToggle() {
  const { setTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const Themes = ['system', 'dark', 'light']

  const ThemeSwitcher = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % Themes.length);
    setTheme(Themes[currentIndex])
    toast.success(`Theme set to ${Themes[currentIndex]}`)
  }

  return (
        <Button variant="outline" size="icon" onClick={ThemeSwitcher}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
  );
}
export default ModeToggle