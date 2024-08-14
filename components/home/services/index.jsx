import React from "react";
import Service from "./Service";
import { Books, Certificate, TeachingSvg, Education } from "./Figures";

export default function Services() {
  const services = [
    {
      title: "01. Explicații Detaliate pentru Grile",
      description:
        "Oferim explicații aprofundate pentru fiecare grilă, asigurându-ne că fiecare concept este pe deplin înțeles. Fiecare întrebare este abordată pas cu pas pentru a construi o bază solidă de cunoștințe.",
      reverse: true,
      Component: Books,
    },
    {
      title: "02. Subiecte de Admitere Gratuite",
      description:
        "Îți oferim acces gratuit la subiecte de admitere din anii anteriori, astfel încât să poți exersa și să îți îmbunătățești abilitățile fără costuri suplimentare.",
      reverse: false,
      Component: Certificate,
    },
    {
      title: "03. Ședințe Explicative Personalizate",
      description:
        "Organizăm ședințe explicative personalizate pentru a ne asigura că fiecare student primește atenția necesară. Adaptăm explicațiile în funcție de nevoile tale specifice.",
      reverse: true,
      Component: TeachingSvg,
    },
    {
      title: "Explicații Detaliate ale Grilelor",
      description:
        "Eficiența pregătirii tale este prioritatea noastră. Fiecare grilă este explicată în detaliu pentru a-ți oferi o înțelegere profundă și durabilă a subiectului. Îți facilităm retenția pe termen lung și îți îmbunătățim abilitățile de rezolvare.",
      reverse: false,
      Component: Education,
    },
  ];

  return (
    <section
      id="services"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8"
    >
      <div className="mx-auto text-center">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          De ce noi?
        </h2>
        <p className="font-bold text-4xl mt-2 leading-tight text-gray-800">
          La GrileInfo.ro, ne dedicăm să deschidem porțile educației superioare
          pentru cât mai mulți studenți.
        </p>
        <p className="text-lg mt-4 text-neutral-600 max-w-3xl mx-auto">
          Cu abordări metodice și resurse gratuite, îți oferim toate
          instrumentele necesare pentru a excela la examenele de admitere.
        </p>
      </div>
      <div className="mt-10 space-y-16">
        {services.map((service, index) => (
          <Service
            key={index}
            title={service.title}
            description={service.description}
            reverse={service.reverse}
          >
            <service.Component />
          </Service>
        ))}
      </div>
    </section>
  );
}
