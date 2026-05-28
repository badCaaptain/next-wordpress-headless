import { getMenuByLocation } from "@/lib/wordpress";

export default async function Footer() {
  const menuItems = await getMenuByLocation("main-menu");

  return (
    <footer className="footer" id="contact">
      <div className="footer-logo">
          <a href="/">
              <img
                src="https://grey-moose-264563.hostingersite.com/wp-content/uploads/2026/05/attachment7-1.png"
                alt="Port St. Mary's Marina"
                className="logo-img mx-auto"
              />
            </a>
      </div>
      

      <nav className="mb-4"> 
        {menuItems.map((item: any) => (
          <a key={item.ID || item.id} href={item.url} target={item.target || "_self"}>
            {item.title}
          </a>
        ))}
      </nav>
<div className="flex flex-col sm:flex-row gap-5 mb-3 justify-center">
<p>000 (000-000) </p>|<p> info@portstmarina.com </p>|<p> 3, lorem ipsum</p>
</div>
        <small className="mt-2">
          Copyright © {new Date().getFullYear()} Port St. Mary’s Marina, Inc. All rights reserved.
        </small>
    </footer>
  );
}