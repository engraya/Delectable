import { RxGithubLogo } from "react-icons/rx";

const githubRepoUrl = "https://github.com/engraya/delectable-food-webapp";

export function Footer() {
  return (
    <footer className="rounded-lg mt-10 sticky text-center shadow dark:bg-gray-800 bottom-0 w-full text-white">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:items-center md:justify-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline inline-flex"
            aria-label="GitHub repository"
          >
            <RxGithubLogo aria-hidden />
          </a>
        </span>
        <span className="text-sm text-gray-300 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="hover:underline">Delectable™</span>. All Rights
          Reserved.
        </span>
        <br />
      </div>
    </footer>
  );
}
