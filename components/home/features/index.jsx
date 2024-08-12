import {
  GameIconsTeacher,
  GameIconsRead,
  IcBaselineDiversity3,
  GrommetIconsPlan,
} from "./Icons";

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 md:px-8 flex gap-4 flex-wrap mt-20">
      <article className="flex flex-col items-center justify-start gap-4 basis-full sm:basis-[calc((100%/2)-1rem/2)] lg:basis-[calc((100%/4)-3rem/4)] shadow-lg px-4 py-8 border-2 border-gray-100 rounded-xl cursor-pointer hover:scale-105 duration-300">
        <div className="rounded-xl p-4 bg-green-500 w-fit">
          <IcBaselineDiversity3 />
        </div>
        <h2 className="font-bold text-center">
          Valorizăm Diversitatea în Învățare
        </h2>
        <p className="text-neutral-600">
          Recunoaștem că fiecare student învață diferit. Strategiile noastre de
          învățare sunt la fel de diverse ca și elevii pe care îi servim,
          asigurându-ne că fiecare student este înțeles și susținut în maniera
          cea mai eficientă.
        </p>
      </article>
      <article className="flex flex-col items-center justify-start gap-4 basis-full sm:basis-[calc((100%/2)-1rem/2)] lg:basis-[calc((100%/4)-3rem/4)] shadow-lg px-4 py-8 border-2 border-gray-100 rounded-xl cursor-pointer hover:scale-105 duration-300">
        <div className="rounded-xl p-4 bg-orange-500 w-fit">
          <GrommetIconsPlan />
        </div>
        <h2 className="font-bold text-center">Experiența în Planificare</h2>
        <p className="text-neutral-600">
          Tradițional, materialele educaționale sunt prezentate fără o structură
          clară, lăsând elevii să navigheze prin haos fără o direcție definită.
          Noi schimbăm acest paradigma, oferind planuri structurate cu scopul de
          a atinge obiective clare și tangibile.
        </p>
      </article>
      <article className="flex flex-col items-center justify-start gap-4 basis-full sm:basis-[calc((100%/2)-1rem/2)] lg:basis-[calc((100%/4)-3rem/4)] shadow-lg px-4 py-8 border-2 border-gray-100 rounded-xl cursor-pointer hover:scale-105 duration-300">
        <div className="rounded-xl p-4 bg-green-500 w-fit">
          <GameIconsTeacher />
        </div>
        <h2 className="font-bold text-center">Abordare Personalizată</h2>
        <p className="text-neutral-600">
          Fiecare profesor din echipa noastră aduce o deschidere excepțională
          față de metodele alternative de învățare, asigurându-se că fiecare
          elev primește atenția și resursele de care are nevoie pentru a excela.
        </p>
      </article>
      <article className="flex flex-col items-center justify-start gap-4 basis-full sm:basis-[calc((100%/2)-1rem/2)] lg:basis-[calc((100%/4)-3rem/4)] shadow-lg px-4 py-8 border-2 border-gray-100 rounded-xl cursor-pointer hover:scale-105 duration-300">
        <div className="rounded-xl p-4 bg-orange-500 w-fit">
          <GameIconsRead />
        </div>
        <h2 className="font-bold text-center">Asistență Specializată.</h2>
        <p className="text-neutral-600">
          Pregătirea pentru un examen complex poate fi copleșitoare. Ce ar fi
          dacă ai avea acces la ghidarea expertă a celor care au parcurs deja cu
          succes acest drum? Noi oferim exact acest suport - consiliere expertă
          pentru a naviga provocările academic cu încredere și competență.
        </p>
      </article>
    </section>
  );
}
