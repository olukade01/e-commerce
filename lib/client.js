import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const token = process.env.Token;
export const client = sanityClient({
  projectId: "gdnfh238",
  dataset: "production",
  apiVersion: "2022-07-26",
  useCdn: true,
  token: token,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
