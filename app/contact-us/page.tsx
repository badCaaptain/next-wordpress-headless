import { getPageBySlug, renderShortcode } from "@/lib/wordpress";
import "../styles/contact.css";




const getImg = (img: any) => {
  if (!img) return "";
  if (typeof img === "string") return img;

  return (
    img.url ||
    img.source_url ||
    img.sizes?.large ||
    img.sizes?.full ||
    ""
  );
};

export default async function ContactPage() {
  const page = await getPageBySlug("contact-us");
  const acf = page?.acf || {};
  const formHtml = await renderShortcode(acf?.contact_form?.shortcode);

  return (
    <main className="contact-page">

      {/* Hero */}
      <section
        className="contact-hero"
        style={{
          backgroundImage: `url(${getImg(
            acf?.banner_section?.bg_image
          )})`,
        }}
      >
        <div className="overlay"></div>

        <div className="container">
          <div className="hero-content">
            <h1>{acf?.banner_section?.title}</h1>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  acf?.banner_section?.content || "",
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container contact-grid">

          {/* Left */}
          <div className="contact-left">
            <div className="contact-item">
              <h4>
                {acf?.contact_info?.phone_title}
              </h4>

              <a
                href={`tel:${acf?.contact_info?.phone_number}`}
              >
                {acf?.contact_info?.phone_number}
              </a>
            </div>

            <div className="contact-item">
              <h4>
                {acf?.contact_info?.email_title}
              </h4>

              <a
                href={`mailto:${acf?.contact_info?.email_address}`}
              >
                {acf?.contact_info?.email_address}
              </a>
            </div>

            <div className="contact-item">
              <h4>
                {acf?.contact_info?.address_title}
              </h4>

              <p>
                {acf?.contact_info?.address}
              </p>
            </div>

            {acf?.contact_info?.map_image && (
              <img
                src={getImg(
                  acf?.contact_info?.map_image
                )}
                alt=""
              />
            )}
          </div>

          {/* Right */}
          <div className="contact-form-box">
            <h2>
              {acf?.contact_form?.title}
            </h2>

            <div
  className="form-shortcode"
  dangerouslySetInnerHTML={{
    __html: formHtml,
  }}
/>
          </div>
        </div>
      </section>
    </main>
  );
}