import { getMenuByLocation } from "@/lib/wordpress";

export default async function Header() {
  const menuItems = await getMenuByLocation("main-menu");

  return (
    <header className="site-header">
      <div className="logo">
        PORT ST. MARY’S
        <br />
        MARINA
      </div>

      <nav>
        {menuItems.map((item: any) => (
          <a key={item.ID || item.id} href={item.url} target={item.target || "_self"}>
            {item.title}
          </a>
        ))}
      </nav>
    </header>
  );
}