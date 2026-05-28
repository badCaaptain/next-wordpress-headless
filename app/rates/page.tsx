import { getPageBySlug } from "@/lib/wordpress";

const getImg = (img: any) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "number") return "";

  return (
    img.url ||
    img.source_url ||
    img.sizes?.large ||
    img.sizes?.full ||
    img.sizes?.medium_large ||
    ""
  );
};

const HtmlTitle = ({ tag = "h2", html = "", className = "" }: any) => {
  const Tag = tag;

  if (!html) return null;

  return (
    <Tag
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

  const includeItems = acf?.rates_section?.includes || [];

  return (
    <main className="rates-page">

      {/* HERO */}
      {(bannerBg ||
        acf?.banner_section?.title ||
        acf?.banner_section?.content) && (
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
              tag="h1"
              html={acf?.banner_section?.title}
              className="text-5xl md:text-6xl font-medium mb-5"
            />

            {acf?.banner_section?.content && (
              <div
                className="text-lg md:text-xl leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: acf.banner_section.content,
                }}
              />
            )}
          </div>
        </section>
      )}

      {/* RATES SECTION */}
      {(ratesImage ||
        acf?.rates_section?.title ||
        acf?.rates_section?.transient_price ||
        acf?.rates_section?.monthly_price ||
        acf?.rates_section?.includes_title ||
        includeItems?.length > 0) && (
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
                  html={acf?.rates_section?.title}
                  className="text-5xl md:text-6xl text-[#061d3d] mb-6"
                />

                {(acf?.rates_section?.transient_price ||
                  acf?.rates_section?.monthly_price) && (
                  <div className="space-y-3 mb-7">

                    {acf?.rates_section?.transient_price && (
                      <div className="bg-[#dce8f3] text-[#07708b] text-xl px-5 py-3 inline-block min-w-[300px]">
                        Transient Dockage:{" "}
                        <strong>
                          {acf.rates_section.transient_price}
                        </strong>
                      </div>
                    )}

                    {acf?.rates_section?.monthly_price && (
                      <>
                        <br />
                        <div className="bg-[#f5efc8] text-[#07708b] text-xl px-5 py-3 inline-block min-w-[300px]">
                          Monthly Dockage:{" "}
                          <strong>
                            {acf.rates_section.monthly_price}
                          </strong>
                        </div>
                      </>
                    )}

                  </div>
                )}

                {acf?.rates_section?.includes_title && (
                  <p className="text-lg text-[#3a4050] mb-4">
                    {acf.rates_section.includes_title}
                  </p>
                )}

                {includeItems?.length > 0 && (
                  <ul className="space-y-3 text-[#061d3d] text-lg">
                    {includeItems.map((item: any, i: number) =>
                      item?.title ? (
                        <li key={i} className="flex gap-3 items-start">
                          <span>✓</span>
                          <span>{item.title}</span>
                        </li>
                      ) : null
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PLAN SECTION */}
      {(acf?.plan_section?.title ||
        acf?.plan_section?.content ||
        acf?.plan_section?.btn?.url) && (
        <section className="pb-24 bg-white text-center px-5">
          <HtmlTitle
            html={acf?.plan_section?.title}
            className="text-5xl md:text-6xl text-[#061d3d] mb-3"
          />

          {acf?.plan_section?.content && (
            <div
              className="text-lg text-[#333] mb-6"
              dangerouslySetInnerHTML={{
                __html: acf.plan_section.content,
              }}
            />
          )}

          {acf?.plan_section?.btn?.url && (
            <a
              href={acf.plan_section.btn.url}
              target={acf.plan_section.btn.target || "_self"}
              className="inline-block bg-[#444957] text-white px-10 py-3 rounded-md hover:bg-[#061d3d] transition"
            >
              {acf.plan_section.btn.title}
            </a>
          )}
        </section>
      )}
    </main>
  );
}