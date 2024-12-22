import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CharacterCard = () => {
  const character = [
    {
      model_id: 1,
      name: 'Zeta',
      image: '/assets/images/zeta.png'
    },
    {
      model_id: 2,
      name: 'Elon Musk',
      image: '/assets/images/elon.png'
    },
  ]
  return (
    <div className="grid grid-cols-6 gap-6">
      {
        character.map((item, index) => (
          <div key={item.model_id} className="flex flex-col w-fit h-30 items-center">
            <Link href="/dashboard/calls/1">
              <div className="flex flex-col items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-20 rounded-full shadow-chara-image hover:shadow-chara-image-choosed"
                ></Image>
              </div>
            </Link>
            <p className="text-md font-bold mt-2">{item.name}</p>
            <Link href="#" className="mt-3">
              <button>
                <div className="flex w-fit h-fit px-5 py-1 justify-center items-center bg-dashboard-secondary-bg rounded-lg shadow-button hover:shadow-button-hover">
                  <p className="text-sm font-semibold">Settings</p>
                </div>
              </button>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default CharacterCard