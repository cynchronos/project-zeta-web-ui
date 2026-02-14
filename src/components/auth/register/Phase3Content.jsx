'use client'
import React from 'react'
import { FiCheck } from 'react-icons/fi'

const EULA_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum commodo lorem quis hendrerit. Curabitur dignissim mauris sed condimentum tempus. Morbi ac pulvinar lacus. Nulla quis pellentesque pellentesque. Mauris blandit vel id amet iusto tempus, at amet viverra tristique. Cras quis molestie fermentum. Quisque bibendum congue risque quam lobortis. Ut finis lacus, rutilus et amet faucibus.

Mauris eu pharetra justo, rutrum scelerisque augue. Quisque rutrum lacus sem eget. Noque malesuada ut ante finibus commodo. In hac habitasse platea dictumst. In hac habitasse platea dictumst.

Curabitur egestas rhoncus ante, a nibh vel ultrices id. Integer blandit tristique felis, sed vehicula dui scelerisque nec. Praesent id sapien. Ut ultricies quis iaculis nec mollis leo varius.`

const Phase3Content = ({ formData, handleInputChange }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-base font-semibold text-white">EULA</h3>
      <div className="w-full h-52 overflow-y-auto bg-[#181A1D]/40 border border-[#2E3137] rounded-lg p-4 custom-scrollbar">
        <p className="text-xs text-white/60 leading-relaxed whitespace-pre-line">
          {EULA_TEXT}
        </p>
      </div>

      {/* Accept checkbox */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            name="eulaAccepted"
            checked={formData.eulaAccepted}
            onChange={handleInputChange}
            className="sr-only peer"
          />
          <div className="w-5 h-5 rounded border-2 border-[#2E3137] bg-[#181A1D]/60 peer-checked:bg-[#00DF99] peer-checked:border-[#00DF99] transition-all flex items-center justify-center">
            {formData.eulaAccepted && <FiCheck className="text-white text-sm" />}
          </div>
        </div>
        <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
          I accept the End User License Agreement
        </span>
      </label>
    </div>
  )
}

export default Phase3Content
