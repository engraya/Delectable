import React from 'react'
import { RxGithubLogo } from "react-icons/rx";

function Footer() {

  const githubRepoUrl = "https://github.com/engraya/delectable-food-webapp"
  return (
    <div>
      <footer className="rounded-lg mt-10 sticky text-center shadow dark:bg-gray-800 bottom-0 w-full text-white">
      <div className="w-full mx-auto max-w-screen-xl p-4  md:items-center md:justify-center">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"><a href={githubRepoUrl} target='_blank' className="hover:underline"><RxGithubLogo /></a>
    </span>
    <span className="text-sm text-gray-300 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Delectable™</a>. All Rights Reserved.
    </span><br />
  </div>
</footer>
    </div>
  )
}

export default Footer
