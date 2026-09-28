export default function imageLoader({ src }: { src: string }) {
  if (src.startsWith('/Arivo-Global-Website')) return src;
  return `/Arivo-Global-Website${src}`;
}
