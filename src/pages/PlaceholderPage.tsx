import { Link } from "react-router-dom";

export default function PlaceholderPage({
  title,
  missing = false,
}: {
  title: string;
  missing?: boolean;
}) {
  return (
    <section className="section container" aria-labelledby="page-title">
      <h1 id="page-title">{title}</h1>
      <p>{missing ? "Verifique o endereço da página." : "Página em preparação."}</p>
      <Link className="inline-link" to="/">Voltar ao início</Link>
    </section>
  );
}
