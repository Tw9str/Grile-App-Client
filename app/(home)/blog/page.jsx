import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog() {
  const post = {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur.",
    href: "#",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, aut eum, aspernatur eveniet exercitationem incidunt, quaerat similique fuga asperiores obcaecati nam natus. \n\nLaborum aliquid molestiae, officia, officiis quam voluptas, deleniti accusantium impedit vitae recusandae doloribus. Accusantium perferendis iure alias? Voluptate dolor perspiciatis magni, beatae cumque molestiae in, nam ut libero quasi iusto tempora, itaque totam eaque. Ipsum accusantium unde aut quod maxime et esse quibusdam beatae exercitationem, laudantium nobis voluptatum minus earum molestias! Harum laborum molestias dolorem officiis nesciunt recusandae magnam voluptate amet eligendi, soluta, fuga reiciendis, explicabo quia quis iste aliquid esse inventore facere doloribus aspernatur! Fuga, fugiat eius! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, aut eum, aspernatur eveniet exercitationem incidunt, quaerat similique fuga asperiores obcaecati nam natus.\n\n Laborum aliquid molestiae, officia, officiis quam voluptas, deleniti accusantium impedit vitae recusandae doloribus. Accusantium perferendis iure alias? Voluptate dolor perspiciatis magni, beatae cumque molestiae in, nam ut libero quasi iusto tempora, itaque totam eaque. Ipsum accusantium unde aut quod maxime et esse quibusdam beatae exercitationem, laudantium nobis voluptatum minus earum molestias! Harum laborum molestias dolorem officiis nesciunt recusandae magnam voluptate amet eligendi, soluta, fuga reiciendis, explicabo quia quis iste aliquid esse inventore facere doloribus aspernatur! Fuga, fugiat eius",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Education", href: "#" },
    imgUrl: "/pc.jpg",
    author: {
      name: "John Doe",
      role: "Teacher",
      href: "#",
      imageUrl: "/plus_3d_shape.png",
    },
  };
  return (
    <section
      id="post"
      className="max-w-4xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8 border border-neutral-100 rounded-lg p-4"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <div className="flex items-center gap-x-4 text-xs mt-4">
          <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
          </time>
          <Link
            href={post.category.href}
            className="relative z-10 rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200"
          >
            {post.category.title}
          </Link>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden mb-8">
        <Image src={post.imgUrl} alt="" width={1280} height={720} />
      </div>

      <article className="prose lg:prose-xl text-gray-600 whitespace-pre-wrap">
        <p>{post.description}</p>
      </article>

      <div className="relative w-fit mt-10 flex items-center gap-x-4">
        <Image
          src={post.author.imageUrl}
          alt="author photo"
          className="rounded-full bg-green-100"
          width={50}
          height={50}
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <Link href={post.author.href}>
              <span className="absolute inset-0" />
              {post.author.name}
            </Link>
          </p>
          <p className="text-gray-600">{post.author.role}</p>
        </div>
      </div>
    </section>
  );
}
