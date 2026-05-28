import { getMenuByLocation } from "@/lib/wordpress";

export default async function Footer() {
  const menuItems = await getMenuByLocation("main-menu");

  return (
    <footer className="footer" id="contact">
      <a href="/">
              <img
                src="https://grey-moose-264563.hostingersite.com/wp-content/uploads/2026/05/attachment7-1.png"
                alt="Port St. Mary's Marina"
                className="logo-img"
              />
            </a>

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