import React from 'react'
import a from '../images/a.jpg'
import b from '../images/b.jpg'
import c from '../images/c.jpg'
import d from '../images/d.jpg'
import e from '../images/e.jpg'
import f from '../images/f.jpg'
import g from '../images/g.jpg'
import h from '../images/h.jpg'
import i from '../images/i.jpg'
import j from '../images/j.jpg'
import icon from '../images/food.png'
import author from '../images/aya.png'
import SquigglyLines from '../components/SquigglyLines'
import { Link } from 'react-router-dom'


const githubRepoUrl = "https://github.com/engraya/delectable-food-webapp"

function LandingPage() {
  
  return (
    <div>
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7984b6] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} />
    </div>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center mt-36">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Announcing our next round of Open Source Projects. <a href={githubRepoUrl} target='_blank' className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="text-center">   
        <h4 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl">
        Embark on a Gastronomic Journey with{' '}
          <span className="relative whitespace-nowrap text-[#60b8c4]">
            <SquigglyLines />
            <span className="relative">Delectable</span>
          </span>{' '}
        </h4>
        <p className="mt-6 text-lg leading-8 sm:p-6 lg:px-48">Explore a vast database of global cuisines, from traditional to contemporary.Learn the secrets behind your favorite dishes with detailed recipes and cooking tips. Engage with a community of food lovers, share your experiences, and discover hidden gems.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link to="/recipes">
        <a className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Get started <span aria-hidden="true">→</span></a>
        </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:p-12 lg:px-48">
            <div>
              <img className="h-auto rounded-lg" src={a} alt="" />
            </div>
            <div>
              <img className="h-auto rounded-lg" src={b} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={c} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={d} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={e} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={f} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={g} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={h} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={i} alt="" />
            </div>
            <div>
              <img className="h-auto  rounded-lg" src={j} alt="" />
            </div>
          </div>
      </div>
      

  <div className="mx-auto max-w-2xl lg:max-w-4xl mb-36">
  <p className="mt-0 text-lg leading-8 text-center sm:p-6">At Delectable, we believe in the power of food to connect, inspire, and delight. Our platform is a tribute to the rich tapestry of global culinary traditions. Join us in exploring the stories behind each dish, the passion of the chefs, and the vibrant cultures that give flavor to our world.</p>
    <img className="mx-auto h-12" src={icon} alt="" />
    <figure className="mt-10">
      <blockquote className="text-center text-xl font-semibold leading-8  sm:text-2xl sm:leading-9">
        <p >“As a food enthusiast, Delectable is my go-to source for discovering new recipes and learning about different cuisines. It's a culinary journey like no other!”</p>
      </blockquote>
      <figcaption className="mt-10">
        <img className="mx-auto h-10 w-10 rounded-full" src={author} alt="" />
        <div className="mt-4 flex items-center justify-center space-x-3 text-base">
          <div className="font-semibold">engr_aya</div>
          <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <div className="">Fullstack Engineer</div>
        </div>
      </figcaption>
    </figure>
  </div>

  </div>

  )
}

export default LandingPage
