import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  return (
    <article className="mx-auto flex max-w-xl flex-col items-start justify-between">
      <div className="rounded-xl overflow-hidden">
        <Image src={post.imgUrl} alt="" width={640} height={640} />
      </div>
      <div className="flex items-center gap-x-4 text-xs mt-8">
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
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={post.href}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <Image
          src={post.author.imageUrl}
          alt=""
          className="rounded-full bg-green-100"
          width={40}
          height={40}
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
    </article>
  );
}
