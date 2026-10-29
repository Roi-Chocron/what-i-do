import type { ReactNode } from "react";
import { BrandLockup } from "./BrandLockup";

type Props = { children: ReactNode; dark: boolean; onToggleTheme: () => void };

export function Layout({ children, dark, onToggleTheme }: Props) {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <BrandLockup />
          <nav aria-label="ניווט ראשי">
            <a href="#dashboard">סקירה</a>
            <a href="#projects">פרויקטים</a>
            <a href="#activity">פעילות</a>
          </nav>
          <button className="iconbtn" onClick={onToggleTheme} aria-label="החלפת מצב תצוגה">
            {dark ? "☀" : "☾"}
          </button>
        </div>
      </header>
      <main id="dashboard">{children}</main>
      <footer>
        <div className="wrap footer__inner">
          <BrandLockup />
          <span>כל מה שעשיתי, במקום אחד.</span>
        </div>
      </footer>
    </>
  );
}
