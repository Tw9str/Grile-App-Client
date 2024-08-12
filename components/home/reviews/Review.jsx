import Image from "next/image";

export default function Review() {
  return (
    <div className="px-4 pt-8">
      <figure className="bg-white p-8 rounded-xl border-2 border-neutral-100 shadow-lg">
        <blockquote>
          <p className="text-neutral-600">
            “Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam
            delectus nihil. Aut enim doloremque et ipsam.”
          </p>
        </blockquote>
        <figcaption className=" flex items-center mt-6">
          <div className="relative w-12 h-12">
            <Image className="rounded-full" src="/pc.jpg" alt="" fill />
          </div>

          <div className="ml-4">
            <div className="font-semibold">Leslie Alexander</div>
            <div className="text-neutral-500">@lesliealexander</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
