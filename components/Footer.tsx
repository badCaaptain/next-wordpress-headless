import { getMenuByLocation } from "@/lib/wordpress";

export default async function Footer() {
  const menuItems = await getMenuByLocation("main-menu");

  return (
    <footer className="footer" id="contact">
      <h2>PORT ST. MARY’S MARINA</h2>

      <nav>
        {menuItems.map((item: any) => (
          <a key={item.ID || item.id} href={item.url} target={item.target || "_self"}>
            {item.title}
          </a>
        ))}
      </nav>

       <p>000 (000-000) | info@portstmarina.com | 3, lorem ipsum</p>
        <small>
          Copyright © 2026 Port St. Mary’s Marina, Inc. All rights reserved.
        </small>
    </footer>
  );
}