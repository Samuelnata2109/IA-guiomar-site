import { ArrowUpRight, Braces, Lightbulb, Workflow } from "lucide-react";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
export default function Course() {
  return (
    <>
      <div className="discipline-strip" aria-label="Áreas do curso">
        <div>
          {["ROBÓTICA", "PROGRAMAÇÃO", "DESIGN", "MANUTENÇÃO", "REDES"].map(
            (t) => (
              <span key={t}>
                {t}
                <i>✳</i>
              </span>
            ),
          )}
        </div>
      </div>
      <SectionReveal className="course section container" id="curso">
        <div className="course-title">
          <Eyebrow number="01">SEU PRÓXIMO UNIVERSO</Eyebrow>
          <h2 data-reveal>
            MUITO ALÉM
            <br />
            DE <span className="text-lavender">CÓDIGOS.</span>
          </h2>
          <div className="course-symbol" aria-hidden="true" data-reveal>
            &lt;<span> / </span>&gt;
          </div>
        </div>
        <div className="course-copy">
          <p className="lead" data-reveal>
            Aprenda a criar, desenvolver e transformar ideias em soluções
            tecnológicas.
          </p>
          <p data-reveal>
            Na EEEP Guiomar Belchior Aguiar, em Cariré, o ensino médio encontra
            a formação técnica em Desenvolvimento de Sistemas. Um convite para
            descobrir o que você pode criar.
          </p>
          <div className="course-points" data-reveal>
            <div>
              <Braces />
              <span>
                TECNOLOGIA
                <br />
                <strong>Aprender fazendo.</strong>
              </span>
            </div>
            <div>
              <Lightbulb />
              <span>
                CRIATIVIDADE
                <br />
                <strong>Dar vida às ideias.</strong>
              </span>
            </div>
            <div>
              <Workflow />
              <span>
                POSSIBILIDADES
                <br />
                <strong>Conectar conhecimentos.</strong>
              </span>
            </div>
          </div>
          <a href="#areas" className="inline-link" data-reveal>
            Encontre o que move você <ArrowUpRight size={20} />
          </a>
        </div>
      </SectionReveal>
    </>
  );
}
