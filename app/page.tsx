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

const ImageTag = ({ src, className }: any) => {
  const imageUrl = getImg(src);
  if (!imageUrl) return null;

  return <img src={imageUrl} alt="" className={className} />;
};

export default async function HomePage() {
  const page = await getPageBySlug("home");
  const acf = page?.acf || {};

  const bannerBg = getImg(acf?.banner_section?.bg_image);

  const aboutHasImages =
    hasImg(acf?.about_section?.left_image_first) ||
    hasImg(acf?.about_section?.left_image_second) ||
    hasImg(acf?.about_section?.right_image);

  const marinaHasImage = hasImg(acf?.slower_section?.image);

  return (
    <main className="home-page">
      {/* HEADER + HERO */}
      {(bannerBg || acf?.banner_section?.title || acf?.banner_section?.content) && (
        <section
          className="hero"
          style={bannerBg ? { backgroundImage: `url(${bannerBg})` } : undefined}
        >

          <div className="hero-content">
            {acf?.banner_section?.title && <h1 className="text-5xl font-bold text-red-500">{acf.banner_section.title}</h1>}

            {acf?.banner_section?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: acf.banner_section.content,
                }}
              />
            )}

            {acf?.banner_section?.btn?.url && (
              <a
                className="outline-btn"
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
           <div className="container">
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
            {acf?.about_section?.title && <h2>{acf.about_section.title}</h2>}

            {acf?.about_section?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: acf.about_section.content,
                }}
              />
            )}

            {acf?.about_section?.key?.length > 0 && (
              <ul>
                {acf.about_section.key.map((item: any, i: number) => (
                  <li key={i}>{item?.title}</li>
                ))}
              </ul>
            )}
          </div>
          </div>
        </section>
      )}

      {/* DOCKAGE */}
      {(acf?.cta_section?.title ||
        acf?.cta_section?.content ||
        acf?.cta_section?.btn) && (
        <section className="dockage" id="rates">
          <div className="container">
          {acf?.cta_section?.title && <h2>{acf.cta_section.title}</h2>}

          {acf?.cta_section?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: acf.cta_section.content,
              }}
            />
          )}


          {acf?.cta_section?.btn?.url && (
              <a
                className="outline-btn"
                href={acf.cta_section.btn.url}
                target={acf.cta_section.btn.target || "_self"}
              >
                {acf.cta_section.btn.title}
              </a>
            )}
            </div>
        </section>
      )}

      {/* LOCATION */}
      {(acf?.slower_section?.title ||
        acf?.slower_section?.content ||
        acf?.slower_section?.btn ||
        marinaHasImage) && (
        <section className="location section" id="location">
          <div className="container">
            {acf?.slower_section?.title && (
              <h2>{acf.slower_section.title}</h2>
            )}

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
        </section>
      )}

      {/* COMFORTS */}
      {(acf?.comforts_section?.title ||
        acf?.comforts_section?.content ||
        acf?.comforts_section?.grid?.length > 0) && (
        <section className="comforts">
          <div className="container">
          {acf?.comforts_section?.title && (
            <h2>{acf.comforts_section.title}</h2>
          )}

          {acf?.comforts_section?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: acf.comforts_section.content,
              }}
            />
          )}

          <div className="amenities">
                {[
                  acf?.comforts_section?.grid_1,
                  acf?.comforts_section?.grid_2,
                  acf?.comforts_section?.grid_3,
                  acf?.comforts_section?.grid_4,
                ].map((item: any, i: number) => {
                  const iconUrl = getImg(item?.image);
                  const title = item?.title;

                  if (!iconUrl && !title) return null;

                  return (
                    <div className="amenity" key={i}>
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt=""
                          className="icon"
                        />
                      )}

                      {title && <span>{title}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
        </section>
      )}

      {/* STAY WITH US */}
      {(acf?.stay_with_us_section?.title ||
        acf?.stay_with_us_section?.content ||
        acf?.stay_with_us_section?.btn) && (
        <section className="cta" id="reserve">
          <div className="container">
          {acf?.stay_with_us_section?.title && (
            <h2>{acf.stay_with_us_section.title}</h2>
          )}

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
                href={acf.stay_with_us_section.url}
                target={acf.stay_with_us_section.target || "_self"}
              >
                {acf.stay_with_us_section.title}
              </a>
            )}
            </div>
        </section>
      )}
 
    </main>
  );
}