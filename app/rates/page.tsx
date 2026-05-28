import { getPageBySlug } from "@/lib/wordpress";
import Link from "next/link";

const getImg = (img: any) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "number") return "";

  return (
    img.url ||
    img.source_url ||
    img.sizes?.full ||
    img.sizes?.large ||
    img.sizes?.medium_large ||
    ""
  );
};

const HtmlTitle = ({ html = "", className = "" }: any) => {
  if (!html) return null;

  return (
    <h1
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default async function RatesPage() {
  const page = await getPageBySlug("rates");
  const acf = page?.acf || {};

  const bannerBg = getImg(acf?.banner_section?.bg_image);
  const ratesImage = getImg(acf?.rates_section?.image);

  return (
    <main className="rates-page">
      {/* HERO */}
      <section
        className="relative min-h-[480px] flex items-center justify-center bg-cover bg-center px-5 pt-24"
        style={
          bannerBg
            ? { backgroundImage: `url(${bannerBg})` }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-[#062041]/60"></div>

        <div className="relative z-10 max-w-3xl text-center text-white">
          <HtmlTitle
            html={acf?.banner_section?.title || "Dockage Rates"}
            className="font-eb-garamond text-5xl md:text-6xl font-medium mb-5"
          />

          <div
            className="text-lg md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                acf?.banner_section?.content ||
                "We keep our pricing simple and easy to understand.",
            }}
          />
        </div>
      </section>

      {/* RATES CONTENT */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {ratesImage && (
              <div>
                <img
                  src={ratesImage}
                  alt=""
                  className="w-full rounded-xl object-cover"
                />
              </div>
            )}

            <div>
              <HtmlTitle
                html={acf?.rates_section?.title || "Rates"}
                className="font-eb-garamond text-5xl md:text-6xl text-[#061d3d] mb-6"
              />

              <div className="space-y-3 mb-7">
                <div className="bg-[#dce8f3] text-[#07708b] text-xl px-5 py-3 inline-block min-w-[300px]">
                  Transient Dockage:{" "}
                  <strong>
                    {acf?.rates_section?.transient_price || "$X.XX / ft"}
                  </strong>
                </div>

                <br />

                <div className="bg-[#f5efc8] text-[#07708b] text-xl px-5 py-3 inline-block min-w-[300px]">
                  Monthly Dockage:{" "}
                  <strong>
                    {acf?.rates_section?.monthly_price || "$X.XX / ft"}
                  </strong>
                </div>
              </div>

              <p className="text-lg text-[#3a4050] mb-4">
                {acf?.rates_section?.includes_title || "Your stay includes:"}
              </p>

              <ul className="space-y-3 text-[#061d3d] text-lg">
                {(
                  acf?.rates_section?.includes || [
                    { title: "Power access" },
                    { title: "Water access" },
                    { title: "WiFi (if applicable)" },
                    { title: "Full access to all marina amenities" },
                  ]
                ).map((item: any, i: number) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-[#061d3d]">✓</span>
                    <span>{item?.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 bg-white text-center px-5">
        <HtmlTitle
          html={acf?.plan_section?.title || "Ready to Plan Your Stop?"}
          className="font-eb-garamond text-5xl md:text-6xl text-[#061d3d] mb-3"
        />

        <div
          className="text-lg text-[#333] mb-6"
          dangerouslySetInnerHTML={{
            __html:
              acf?.plan_section?.content ||
              "Booking takes just a few minutes.",
          }}
        />

        {acf?.plan_section?.btn?.url ? (
          <a
            href={acf.plan_section.btn.url}
            target={acf.plan_section.btn.target || "_self"}
            className="inline-block bg-[#444957] text-white px-10 py-3 rounded-md hover:bg-[#061d3d] transition"
          >
            {acf.plan_section.btn.title}
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-block bg-[#444957] text-white px-10 py-3 rounded-md hover:bg-[#061d3d] transition"
          >
            Reserve Now
          </Link>
        )}
      </section>
    </main>
  );
}