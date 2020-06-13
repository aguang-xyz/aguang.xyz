import { Feed } from "feed";
import { argv } from "yargs";
import Yaml from "js-yaml";
import { markdownToTxt } from "markdown-to-txt";
import Fs from "fs";

if (argv.yaml) {
  const path = argv.yaml;
  const meta = Yaml.safeLoad(Fs.readFileSync(path, "utf8"));

  const categoryId = path
    .replace(/^\.\/public\/posts\//, "")
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

  const getContent = (post) => {
    const path = `./public/posts/${post.id}.md`;

    if (Fs.existsSync(path)) {
      return markdownToTxt(Fs.readFileSync(path, "utf8"));
    } else {
      return post.title;
    }
  };

  const getDate = (post) => {
    const path = `./public/posts/${post.id}.md`;

    if (Fs.existsSync(path)) {
      return new Date(Fs.statSync(path).mtimeMs);
    } else {
      return new Date();
    }
  };

  meta.posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      content: getContent(post),
      id: post.id,
      link: post.link || `https://aguang.xyz/#/post/${post.id}`,
      date: getDate(post),
    });
  });

  Fs.writeFileSync(path.replace(/\/index\.yaml$/, "/index.rss"), feed.rss2());
}
