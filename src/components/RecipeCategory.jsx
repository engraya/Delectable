import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RecipeCategory() {
  const location = useLocation();
  const activePath = location.pathname;

  const categories = [
    { name: 'African', path: '/cuisines/African' },
    { name: 'American', path: '/cuisines/American' },
    { name: 'European', path: '/cuisines/European' },
    { name: 'Indian', path: '/cuisines/Indian' },
    { name: 'Mediterranean', path: '/cuisines/Mediterranean' },
    { name: 'Asian', path: '/cuisines/Asian' },
  ];

  return (
    <div>
      <div className="divB flex flex-wrap justify-center mx-auto max-w-2xl items-center">
        {categories.map((category) => (
          <Link to={category.path} key={category.name}>
            <button
              className={`${
                activePath === category.path
                  ? 'animate-bounce bg-green-400'
                  : 'bg-gradient-to-r from-green-400 to-blue-500'
              } focus:animate-none hover:animate-none rounded-tl-full rounded-br-full text-white text-xs text-center self-center px-4 py-2 m-2`}
            >
              {category.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeCategory;
