import useOutsideClick from "../../utils/useOutsideClick";

const mainUrl = import.meta.env.VITE_MAIN_URL;

const NavData: NavLink[] = [
  { title: "Главная", url: `${mainUrl}` },
  { title: "Маршруты", url: `${mainUrl}marshruty/` },
  { title: "Как добраться", url: `${mainUrl}kak-do-nas-dobratsya/` },
  { title: "Полезное", url: `${mainUrl}poleznaya-informaciya/` },
  { title: "Контакты", url: `${mainUrl}kontakty/` },
];

const Nav = () => {
  const { isOpen, setIsOpen, ref } = useOutsideClick(false);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <input type="checkbox" checked={isOpen} onChange={(e) => handleClick(e)} />
      <div className={`burger-box ${isOpen && "open"}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`nav ${isOpen && "open"}`} role="navigation">
        <ul ref={ref} className="nav-list">
          {NavData.map((link, idx) => {
            return (
              <li className="li" key={idx}>
                <a href={link.url} target="_blank" className="link">
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
