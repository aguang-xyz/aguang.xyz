import { Feed } from "feed";
import { argv } from "yargs";
import Yaml from "js-yaml";
import Fs from "fs";

if (argv.yaml) {
  const path = argv.yaml;
  const meta = Yaml.safeLoad(Fs.readFileSync(path, "utf8"));

  const categoryId = path
    .replace(/^\.\/docs\/posts\//, "")
    .replace(/\/index\.yaml$/, "");

  const feed = new Feed({
    title: meta.title,
    description: meta.title,
    id: categoryId,
    link: `https://aguang.xyz/#/post/${categoryId}`,
    updated: new Date(),
    author: {
      name: "Grey Wang",
      email: "aguang.xyz@gmail.com",
      link: "https://aguang.xyz/",
    },
  });

  meta.posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: post.link || `https://aguang.xyz/#/post/${post.id}`,
    });
  });

  Fs.writeFileSync(path.replace(/\/index\.yaml$/, "/index.rss"), feed.rss2());
}
