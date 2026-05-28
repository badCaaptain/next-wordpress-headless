import { getPageBySlug } from "@/lib/wordpress";

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

const hasImg = (img: any) => Boolean(getImg(img));

const ImageTag = ({ src, className, alt = "" }: any) => {
  const imageUrl = getImg(src);
  if (!imageUrl) return null;

  return <img src={imageUrl} alt={alt} className={className} />;
};

const HtmlTitle = ({
  tag = "h2",
  html = "",
  className = "",
}: any) => {
  const Tag = tag;

  if (!html) return null;

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default async function HomePage() {
  const page = await getPageBySlug("home");
  const acf = page?.acf || {};

  const bannerBg = getImg(acf?.banner_section?.bg_image);
  const ctaBg = getImg(acf?.cta_section?.bg_image);

  const aboutHasImages =
    hasImg(acf?.about_section?.left_image_first) ||
    hasImg(acf?.about_section?.left_image_second) ||
    hasImg(acf?.about_section?.right_image);

  const marinaHasImage = hasImg(acf?.slower_section?.image);

  const comfortItems = [
    acf?.comforts_section?.grid_1,
    acf?.comforts_section?.grid_2,
    acf?.comforts_section?.grid_3,
    acf?.comforts_section?.grid_4,
  ].filter(Boolean);

  return (
    <main className="home-page">
      {/* HERO */}
      {(bannerBg ||
        acf?.banner_section?.title ||
        acf?.banner_section?.content ||
        acf?.banner_section?.btn?.url) && (
        <section
          className="hero"
          style={
            bannerBg
              ? { backgroundImage: `url(${bannerBg})` }
              : undefined
          }
        >
          <div className="hero-content">
            <HtmlTitle
              tag="h1"
              html={acf?.banner_section?.title}
              className="text-5xl font-medium mb-3"
            />

            {acf?.banner_section?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: acf.banner_section.content,
                }}
              />
            )}

            {acf?.banner_section?.btn?.url && (
              <a
                className="mt-4 outline-btn"
                href={acf.banner_section.btn.url}
                target={acf.banner_section.btn.target || "_self"}
              >
                {acf.banner_section.btn.title}
              </a>
            )}
          </div>
        </section>
      )}

      {/* ABOUT */}
      {(aboutHasImages ||
        acf?.about_section?.title ||
        acf?.about_section?.content ||
        acf?.about_section?.key?.length > 0) && (
        <section className="about section">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row gap-10">
              {aboutHasImages && (
                <div className="image-grid">
                  <ImageTag
                    src={acf?.about_section?.left_image_first}
                    className="ph ph-small"
                  />

                  <ImageTag
                    src={acf?.about_section?.left_image_second}
                    className="ph ph-tall"
                  />

                  <ImageTag
                    src={acf?.about_section?.right_image}
                    className="ph ph-small"
                  />
                </div>
              )}

              <div className="about-text">
                <HtmlTitle html={acf?.about_section?.title} />

                {acf?.about_section?.content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: acf.about_section.content,
                    }}
                  />
                )}

                {acf?.about_section?.key?.length > 0 && (
                  <ul>
                    {acf.about_section.key.map(
                      (item: any, i: number) =>
                        item?.title ? (
                          <li key={i}>{item.title}</li>
                        ) : null
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DOCKAGE */}
      {(acf?.cta_section?.title ||
        acf?.cta_section?.content ||
        acf?.cta_section?.btn?.url ||
        ctaBg) && (
        <section
          className="dockage"
          id="rates"
          style={
            ctaBg
              ? { backgroundImage: `url(${ctaBg})` }
              : undefined
          }
        >
          <div className="custom-container">
            <HtmlTitle html={acf?.cta_section?.title} />

            {acf?.cta_section?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: acf.cta_section.content,
                }}
              />
            )}

            {acf?.cta_section?.btn?.url && (
              <a
                className="dark-btn mt-4"
                href={acf.cta_section.btn.url}
                target={acf.cta_section.btn.target || "_self"}
              >
                {acf.cta_section.btn.title}
              </a>
            )}
          </div>
        </section>
      )}

      {/* LOCATION / SLOWER SECTION */}
      {(acf?.slower_section?.title ||
        acf?.slower_section?.content ||
        acf?.slower_section?.btn?.url ||
        marinaHasImage) && (
        <section className="location section" id="location">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <HtmlTitle html={acf?.slower_section?.title} />

                {acf?.slower_section?.content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: acf.slower_section.content,
                    }}
                  />
                )}

                {acf?.slower_section?.btn?.url && (
                  <a
                    className="dark-btn"
                    href={acf.slower_section.btn.url}
                    target={acf.slower_section.btn.target || "_self"}
                  >
                    {acf.slower_section.btn.title}
                  </a>
                )}
              </div>

              {marinaHasImage && (
                <ImageTag
                  src={acf?.slower_section?.image}
                  className="ph ph-wide"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMFORTS */}
      {(acf?.comforts_section?.title ||
        acf?.comforts_section?.content ||
        comfortItems.length > 0) && (
        <section className="comforts">
          <div className="container mx-auto">
            <HtmlTitle html={acf?.comforts_section?.title} />

            {acf?.comforts_section?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: acf.comforts_section.content,
                }}
              />
            )}

            {comfortItems.length > 0 && (
              <div className="amenities">
                {comfortItems.map((item: any, i: number) => {
                  const iconUrl = getImg(item?.image);
                  const title = item?.title;

                  if (!iconUrl && !title) return null;

                  return (
                    <div className="amenity" key={i}>
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={title || ""}
                          className="icon"
                        />
                      )}

                      {title && <span>{title}</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* STAY WITH US */}
      {(acf?.stay_with_us_section?.title ||
        acf?.stay_with_us_section?.content ||
        acf?.stay_with_us_section?.btn?.url) && (
        <section className="cta" id="reserve">
          <div className="container mx-auto">
            <HtmlTitle html={acf?.stay_with_us_section?.title} />

            {acf?.stay_with_us_section?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: acf.stay_with_us_section.content,
                }}
              />
            )}

            {acf?.stay_with_us_section?.btn?.url && (
              <a
                className="dark-btn"
                href={acf.stay_with_us_section.btn.url}
                target={acf.stay_with_us_section.btn.target || "_self"}
              >
                {acf.stay_with_us_section.btn.title}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}