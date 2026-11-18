import { ArrowUpRight, BrainCircuit, Lightbulb, Workflow } from "lucide-react";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
export default function Course() {
  return (
    <>
      <div className="discipline-strip" aria-label="Áreas do curso">
        <div>
          {[
            "INTRODUÇÃO À IA",
            "IA GENERATIVA",
            "MACHINE LEARNING",
            "VISÃO COMPUTACIONAL",
            "AUTOMAÇÃO E AGENTES",
          ].map(
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
            INTELIGÊNCIA
            <br />
            <span className="text-lavender">QUE APRENDE.</span>
          </h2>
          <div className="course-symbol" aria-hidden="true" data-reveal>
            &lt;<span> / </span>&gt;
          </div>
        </div>
        <div className="course-copy">
          <p className="lead" data-reveal>
            Inteligência Artificial é uma tecnologia que aprende a reconhecer
            padrões a partir de dados para ajudar a resolver problemas.
          </p>
          <p data-reveal>
            No curso técnico da EEEP Guiomar Belchior Aguiar, em Cariré, você
            vai explorar como a IA aparece no cotidiano e conhecer caminhos para
            criar soluções inteligentes com criatividade, lógica e
            responsabilidade.
          </p>
          <div className="course-points" data-reveal>
            <div>
              <BrainCircuit />
              <span>
                INTELIGÊNCIA ARTIFICIAL
                <br />
                <strong>Aprender com dados.</strong>
              </span>
            </div>
            <div>
              <Lightbulb />
              <span>
                CRIATIVIDADE
                <br />
                <strong>Imaginar novas soluções.</strong>
              </span>
            </div>
            <div>
              <Workflow />
              <span>
                USO RESPONSÁVEL
                <br />
                <strong>Pensar nos impactos.</strong>
              </span>
            </div>
          </div>
          <a href="#areas" className="inline-link" data-reveal>
            Explore as áreas do curso <ArrowUpRight size={20} />
          </a>
        </div>
      </SectionReveal>
    </>
  );
}
