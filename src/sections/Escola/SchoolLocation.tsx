import { ArrowUpRight, MapPin, Phone, ExternalLink } from "lucide-react";
import { SectionReveal, Eyebrow, AnimatedGradient } from "../../components/animations/Shared";
import { mapLink, officialSite } from "../../data/content";
export function Enrollment() {
  return (
    <SectionReveal id="matriculas" className="enrollment-wrap container">
      <div className="enrollment">
        <AnimatedGradient />
        <div className="enrollment-orbit" aria-hidden="true" />
        <span className="enrollment-star" aria-hidden="true">
          ✳
        </span>
        <Eyebrow>ENSINO MÉDIO + FORMAÇÃO TÉCNICA</Eyebrow>
        <h2 data-reveal>
          SEU FUTURO PODE
          <br />
          COMEÇAR <span>AQUI.</span>
        </h2>
        <p data-reveal>
          As matrículas são divulgadas pela SEDUC-CE e pela escola. Acompanhe o
          edital para 2027 e confira os prazos e orientações nos canais
          oficiais.
        </p>
        <a
          className="button button-white"
          href="https://www.seduc.ce.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          ACOMPANHAR MATRÍCULAS <ArrowUpRight size={19} />
        </a>
        <span className="enrollment-note">
          Informações oficiais na SEDUC-CE e na instituição.
        </span>
      </div>
    </SectionReveal>
  );
}
export default function SchoolLocation() {
  return (
    <SectionReveal id="escola" className="section school container">
      <div className="school-copy">
        <Eyebrow number="05">CONEXÃO COM O NOSSO LUGAR</Eyebrow>
        <h2 data-reveal>
          O FUTURO
          <br />
          TEM <span className="text-lavender">ENDEREÇO.</span>
        </h2>
        <h3 data-reveal>
          EEEP Guiomar
          <br />
          Belchior Aguiar
        </h3>
        <p className="school-city" data-reveal>
          Cariré — Ceará
        </p>
        <address data-reveal>
          <MapPin size={20} />
          <span>
            Rodovia CE-183, s/n — Cariré Velho
            <br />
            Cariré–CE · CEP 62184-000
          </span>
        </address>
        <a className="phone" href="tel:+558836461174" data-reveal>
          <Phone size={18} />
          (88) 3646-1174
        </a>
        <a
          className="button button-outline"
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          VER NO GOOGLE MAPS <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="map-panel" data-reveal>
        <div className="map-top">
          <MapPin size={18} />
          <span>CARIRÉ, CEARÁ</span>
          <ExternalLink size={15} />
        </div>
        <iframe
          title="Localização da EEEP Guiomar Belchior Aguiar em Cariré"
          src="https://www.google.com/maps?q=EEEP%20Guiomar%20Belchior%20Aguiar%20Carir%C3%A9%20CE&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="map-bottom">
          <span>Seu próximo ponto de partida.</span>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir localização no Google Maps"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-main">
        <a className="brand" href="#inicio">
          <img
            src="./assets/logo-ds-guiomar.png"
            width="44"
            height="44"
            alt="Logo do curso"
          />
          <span>
            DESENVOLVIMENTO
            <small>
              DE SISTEMAS <i /> GUIOMAR
            </small>
          </span>
        </a>
        <p>
          Ideias locais.
          <br />
          <span>Possibilidades sem limites.</span>
        </p>
        <a className="back-top" href="#inicio">
          VOLTAR AO TOPO <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>EEEP Guiomar Belchior Aguiar · Cariré–CE</span>
        <a href={officialSite} target="_blank" rel="noopener noreferrer">
          Site original do curso <ArrowUpRight size={13} />
        </a>
        <span>
          FEITO PARA QUEM QUER CRIAR <span className="purple-dot">✳</span>
        </span>
      </div>
    </footer>
  );
}
