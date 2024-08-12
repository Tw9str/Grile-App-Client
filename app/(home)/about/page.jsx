import Image from "next/image";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 md:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Despre noi
        </h2>
        <p className="font-bold text-5xl mt-2">Cine suntem ?</p>
        <p className="text-gray-600 mt-4">
          Suntem o echipa de doi studenti de la UBB-Cluj specializarea
          Informatica Romana care dorim sa facem intrarea la facultate cat mai
          usoara pentru toti, astfel am decis sa facem un site cu grile si
          cateva articole cu informatii si teorie utila pentru a invata.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 items-center justify-center gap-16 mt-10">
        <div className="flex justify-center items-center">
          <Image
            src="/pc.jpg"
            alt="About Us"
            width={800}
            height={800}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-800">
              Misiunea noastra
            </h3>
            <p className="text-gray-600">
              Misiunea noastra este sa usuram cat de mult procesul vorstu de a
              intra la facultate si sa o facem pentru un cost accesibil tuturor.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-800">Viziunea</h3>
            <p className="text-gray-600">
              Noi ne dorim sa nu treceti prin ce am trecut si noi cand am fost
              elevi. Adica ? Sa nu fiti nevoiti sa cautati non stop locuri din
              care sa lucrati si informatii noi fara niciun fel de compas, asa
              ca n-am propus sa structuram asta intr-un mode "learn by doing",
              din punctul meu de vedere si cel mai bun mod de invatare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
