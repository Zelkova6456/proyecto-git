import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const iterator = Deno.readDir("./content");
    const directories: Record<string, string[]> = {};
    for await (const dir of iterator) {
      const files = Deno.readDir(`./content/${dir.name}`);
      for await (const file of files) {
        if (!directories[dir.name]) directories[dir.name] = [];
        directories[dir.name].push(file.name);
      }
    }
    return ctx.render(directories);
  },
};

type HomeProps = Record<string, string[]>;

export default function Home(props: PageProps<HomeProps>) {
  if (props.data) console.log(props.data);
  const { data } = props;
  const dirs = Object.keys(data);

  return (
    <>
      <Head>
        <title>nico-guia-git</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-blue-200">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
            width="128"
            height="128"
          />
          <h1 class="text-4xl font-bold">
            Guía del curso de Terminal, Git y Github
          </h1>
          <p class="my-4">
            Qué conceptos cubrí en el curso con Sicos Informática -{" "}
            <b>Nico Gonzalez</b>
          </p>
        </div>
      </div>
      <div className="max-w-screen-md mx-auto">
        <ul className="p-2 flex justify-center gap-2">
          {Object.keys(data).map((dir: string) => <Button>{dir}</Button>)}
        </ul>
        <ul className="p-2 flex justify-center gap-2">
          {Object.values(data).flat().map((dir: string) => (
            <Button>{dir}</Button>
          ))}
        </ul>
      </div>
    </>
  );
}
