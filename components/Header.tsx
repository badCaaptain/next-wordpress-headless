import { getMenuByLocation } from "@/lib/wordpress";

export default async function Header() {
  const menuItems = await getMenuByLocation("main-menu");

  return (
    <header className="site-header">
      <div className="container">
        <div className="flex-col justify-between gap-5 ">
            <div className="logo">
              <a href="/">
                <img
                  src="https://grey-moose-264563.hostingersite.com/wp-content/uploads/2026/05/attachment7-1.png"
                  alt="Port St. Mary's Marina"
                  className="logo-img"
                />
              </a>
            </div>

            <div className="flex-col gap-5">
              <nav>
                {menuItems.map((item: any) => (
                  <a
                    key={item.ID || item.id}
                    href={item.url}
                    target={item.target || "_self"}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
                <a href="#" className="header-btn">Reserve Now</a>
            </div>
        </div>
      </div>
      

      <nav>
        {menuItems.map((item: any) => (
          <a
            key={item.ID || item.id}
            href={item.url}
            target={item.target || "_self"}
          >
            {item.title}
          </a>
        ))}
      </nav>


    </header>
  );
}